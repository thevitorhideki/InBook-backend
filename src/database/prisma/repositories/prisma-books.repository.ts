import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { BooksRepository } from '@modules/books/books.repository';
import { CreateBookDto } from '@modules/books/dto/create-book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBookMapper } from '../mappers/prisma-book.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBookById(id: number): Promise<Book> {
    try {
      const book = await this.prisma.book.findUniqueOrThrow({
        where: { id },
        include: {
          author: true,
          reviews: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
          interactions: true,
        },
      });

      return PrismaBookMapper.toEntity(book);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found');
      }
      throw error;
    }
  }

  async getBooksByGenre(genre: Genre, limit?: number): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
      include: {
        author: true,
      },
      take: limit || 10,
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async createBook(bookData: CreateBookDto): Promise<void> {
    try {
      await this.prisma.book.create({
        data: bookData,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('Author not found');
      }
      throw error;
    }
  }

  async updateBook(id: number, bookData: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    try {
      await this.prisma.book.update({
        where: { id },
        data: raw,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found');
      } else if (error.code === 'P2003') {
        throw new NotFoundException('Author not found');
      }

      throw error;
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found');
      }

      throw error.code;
    }
  }
}

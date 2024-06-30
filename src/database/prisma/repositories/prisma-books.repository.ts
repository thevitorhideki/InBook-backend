import { Book } from '@/database/entities/book';
import { Genre } from '@/database/enums/genre';
import { Language } from '@/database/enums/language';
import { BooksRepository } from '@/modules/books/books.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBookMapper } from '../mappers/prisma-book.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBookById(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
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

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return PrismaBookMapper.toEntity(book);
  }

  async getBooksByGenre(genre: Genre): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBooksByLanguage(language: Language): Promise<any[]> {
    const books = await this.prisma.book.findMany({
      where: {
        language,
      },
      include: {
        reviews: true,
      },
    });

    return books;
  }

  async createBook(bookData: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    await this.prisma.book.create({
      data: raw,
    });
  }

  async updateBook(id: number, bookData: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    await this.prisma.book.update({
      where: { id },
      data: raw,
    });
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.prisma.book.delete({
      where: { id },
    });
  }
}

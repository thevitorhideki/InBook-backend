import { Book } from '@database/entities/book';
import { BooksRepository } from '@modules/books/books.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaBookMapper } from '../mappers/prisma-book.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        authors: true,
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        authors: true,
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBookById(id: string): Promise<Book> {
    try {
      const book = await this.prisma.book.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          title: true,
          slug: true,
          authors: true,
        },
      });

      return PrismaBookMapper.toEntity(book);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found.');
      }
      throw error;
    }
  }

  async createBook(bookData: Book): Promise<string> {
    const raw = PrismaBookMapper.toPrisma(bookData);
    const authorIds = raw.authors.map((author) => ({ id: author.id }));

    try {
      const book = await this.prisma.book.create({
        data: {
          title: raw.title,
          slug: raw.slug,
          authors: {
            connect: authorIds,
          },
        },
      });

      return book.id;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('Author not found.');
      } else if (error.code === 'P2002') {
        throw new BadRequestException('A book with this slug already exists.');
      }
      throw error;
    }
  }

  async updateBook(id: string, bookData: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);
    const authorIds = raw.authors.map((author) => ({ id: author.id }));

    try {
      await this.prisma.book.update({
        where: { id },
        data: {
          title: raw.title,
          slug: raw.slug,
          authors: {
            set: authorIds,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found.');
      } else if (error.code === 'P2003') {
        throw new NotFoundException('Author not found.');
      }

      throw error;
    }
  }

  async deleteBook(id: string): Promise<void> {
    try {
      await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found.');
      }

      throw error.code;
    }
  }
}

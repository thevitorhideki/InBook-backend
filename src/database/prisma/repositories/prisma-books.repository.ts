import { Injectable } from '@nestjs/common';
import { Genre, Language } from '@prisma/client';
import { Book } from 'src/entities/book';
import { BooksRepository } from 'src/modules/books/books.repository';
import { PrismaBookMapper } from '../mappers/prisma-book.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    return PrismaBookMapper.toEntity(book);
  }

  async findByAuthorId(authorId: number): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        authorId,
      },
    });

    if (!books) {
      return null;
    }

    return books.map((book) => PrismaBookMapper.toEntity(book));
  }

  async findByGenre(genre: Genre): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
    });

    if (!books) {
      return null;
    }

    return books.map((book) => PrismaBookMapper.toEntity(book));
  }

  async findByLanguage(language: Language): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        language,
      },
    });

    if (!books) {
      return null;
    }

    return books.map((book) => PrismaBookMapper.toEntity(book));
  }

  async create(bookData: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    await this.prisma.book.create({
      data: raw,
    });
  }

  async update(id: number, bookData: Partial<Book>): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    await this.prisma.book.update({
      where: { id },
      data: raw,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}

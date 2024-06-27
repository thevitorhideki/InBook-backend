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

    if (!book) {
      return null;
    }

    return PrismaBookMapper.toEntity(book);
  }

  async findByAuthor(authorName: string): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        author: {
          name: authorName,
        },
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

    const author = await this.prisma.author.findUnique({
      where: {
        id: bookData.authorId,
      },
    });

    if (!author) {
      return null;
    }

    await this.prisma.book.create({
      data: raw,
    });
  }

  async update(id: number, data: Book): Promise<void> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return null;
    }

    const raw = PrismaBookMapper.toPrisma(data);

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

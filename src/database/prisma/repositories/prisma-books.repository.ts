import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { BooksRepository } from '@modules/books/books.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBookMapper } from '../mappers/prisma-book.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

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
        cover_image_url: true,
        pages: true,
        duration: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        interactions: {
          _count: 'desc',
        },
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBooksByGenre(genre: Genre, limit?: number): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
      select: {
        id: true,
        title: true,
        cover_image_url: true,
        duration: true,
        pages: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: limit || 10,
      orderBy: {
        interactions: {
          _count: 'desc',
        },
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBooksByRelevance(limit?: number): Promise<any[]> {
    const books = await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        cover_image_url: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: limit || 10,
      orderBy: {
        interactions: {
          _count: 'desc',
        },
      },
    });

    return books.map(PrismaBookMapper.toEntity);
  }

  async getBookById(id: number): Promise<Book> {
    try {
      const book = await this.prisma.book.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          genres: true,
          language: true,
          pages: true,
          duration: true,
          publication_year: true,
          cover_image_url: true,
          audiobook_file_url: true,
          author: {
            select: {
              id: true,
              name: true,
              about: true,
              avatar_url: true,
              books: {
                select: {
                  id: true,
                  title: true,
                  cover_image_url: true,
                },
              },
            },
          },
          reviews: {
            select: {
              id: true,
              title: true,
              content: true,
              recommended: true,
              enjoyed_content: true,
              enjoyed_narration: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  profile: {
                    select: {
                      avatar_url: true,
                    },
                  },
                },
              },
            },
          },
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

  async createBook(bookData: Book): Promise<number> {
    const raw = PrismaBookMapper.toPrisma(bookData);

    try {
      const book = await this.prisma.book.create({
        data: raw,
      });

      return book.id;
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

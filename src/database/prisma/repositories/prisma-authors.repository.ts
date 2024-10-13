import { Author } from '@database/entities/author';
import { AuthorsRepository } from '@modules/authors/authors.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/prisma-author.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAuthors(): Promise<Author[]> {
    const authors = await this.prisma.author.findMany({
      select: {
        id: true,
        name: true,
        books: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return authors.map(PrismaAuthorMapper.toEntity);
  }

  async getAuthorById(authorId: string): Promise<Author> {
    try {
      const author = await this.prisma.author.findUniqueOrThrow({
        where: { id: authorId },
        select: {
          id: true,
          name: true,
          books: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return PrismaAuthorMapper.toEntity(author);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Author not found');
      }
      throw error;
    }
  }

  async getAuthorsByName(name: string): Promise<any> {
    const authors = await this.prisma.author.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        books: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return authors.map(PrismaAuthorMapper.toEntity);
  }

  async createAuthor(authorData: Author): Promise<string> {
    const raw = PrismaAuthorMapper.toPrisma(authorData);
    const author = await this.prisma.author.create({ data: raw });

    return author.id;
  }

  async updateAuthor(authorId: string, authorData: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(authorData);

    try {
      await this.prisma.author.update({
        where: { id: authorId },
        data: raw,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Author not found');
      }
      throw error;
    }
  }

  async deleteAuthor(authorId: string): Promise<void> {
    try {
      await this.prisma.author.delete({ where: { id: authorId } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Author not found');
      }
      throw error;
    }
  }
}

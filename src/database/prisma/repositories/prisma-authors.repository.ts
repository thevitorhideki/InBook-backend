import { Author } from '@/database/entities/author';
import { AuthorsRepository } from '@/modules/authors/authors.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/prisma-author.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAuthor(authorData: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(authorData);

    await this.prisma.author.create({ data: raw });
  }

  async getAuthorById(authorId: number): Promise<Author> {
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
      include: {
        books: true,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return PrismaAuthorMapper.toEntity(author);
  }

  async updateAuthor(authorId: number, authorData: Author): Promise<void> {
    const book = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!book) {
      throw new NotFoundException('Author not found');
    }

    const raw = PrismaAuthorMapper.toPrisma(authorData);

    await this.prisma.author.update({
      where: { id: authorId },
      data: raw,
    });
  }

  async deleteAuthor(authorId: number): Promise<void> {
    const book = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!book) {
      throw new NotFoundException('Author not found');
    }

    await this.prisma.author.delete({ where: { id: authorId } });
  }
}

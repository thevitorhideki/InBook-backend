import { Author } from '@/entities/author';
import { AuthorsRepository } from '@/modules/authors/authors-repository';
import { Injectable } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/prisma-author.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private prisma: PrismaService) {}

  async createAuthor(authorData: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(authorData);

    await this.prisma.author.create({ data: raw });
  }

  async getAuthorById(authorId: number): Promise<Author> {
    throw new Error('Method not implemented.');
  }

  async updateAuthor(authorId: number, author: Author): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteAuthor(authorId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

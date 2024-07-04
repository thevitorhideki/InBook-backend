import { Author } from '@database/entities/author';
import { AuthorsRepository } from '@modules/authors/authors.repository';
import { CreateAuthorDto } from '@modules/authors/dto/create-author.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/prisma-author.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAuthor(authorData: CreateAuthorDto): Promise<void> {
    await this.prisma.author.create({ data: authorData });
  }

  async getAuthorById(authorId: number): Promise<Author> {
    try {
      const author = await this.prisma.author.findUniqueOrThrow({
        where: { id: authorId },
        include: {
          books: true,
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

  async updateAuthor(authorId: number, authorData: Author): Promise<void> {
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

  async deleteAuthor(authorId: number): Promise<void> {
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

import { Author } from '@database/entities/author';
import { AuthorsRepository } from '@modules/authors/authors.repository';
import { NotFoundException } from '@nestjs/common';

export class InMemoryAuthorsRepository implements AuthorsRepository {
  private authors: Author[] = [];

  async createAuthor(authorData: Author): Promise<void> {
    this.authors.push(authorData);
  }

  async getAuthorById(authorId: number): Promise<Author | null> {
    const author = this.authors.find((author) => author.id === authorId);

    return author || null;
  }

  async updateAuthor(authorId: number, authorData: Author): Promise<void> {
    const authorIndex = this.authors.findIndex(
      (author) => author.id === authorId,
    );

    if (authorIndex === -1) {
      throw new NotFoundException('Author not found');
    }

    this.authors[authorId] = authorData;
  }

  async deleteAuthor(authorId: number): Promise<void> {
    const authorIndex = this.authors.findIndex(
      (author) => author.id === authorId,
    );

    if (authorIndex === -1) {
      throw new NotFoundException('Author not found');
    }

    this.authors.splice(authorIndex, 1);
  }
}

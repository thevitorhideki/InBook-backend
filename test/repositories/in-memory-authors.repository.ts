import { Author } from '@/entities/author';
import { AuthorsRepository } from '@/modules/authors/authors-repository';

export class InMemoryAuthorsRepository implements AuthorsRepository {
  private authors: Author[] = [];

  async createAuthor(authorData: Author): Promise<void> {
    this.authors.push(authorData);
  }

  async getAuthorById(authorId: number): Promise<Author> {
    const author = this.authors.find((author) => author.id === authorId);

    if (!author) {
      return null;
    }

    return author;
  }

  async updateAuthor(authorId: number, authorData: Author): Promise<void> {
    const author = this.authors.find((author) => author.id === authorId);

    if (!author) {
      return null;
    }

    this.authors[authorId] = authorData;
  }

  async deleteAuthor(authorId: number): Promise<void> {
    const authorIndex = this.authors.findIndex(
      (author) => author.id === authorId,
    );

    if (authorIndex >= 0) {
      this.authors.splice(authorIndex, 1);
    }
  }
}

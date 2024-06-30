import { Author } from '@/database/entities/author';

export abstract class AuthorsRepository {
  abstract createAuthor(authorData: Author): Promise<void>;
  abstract getAuthorById(authorId: number): Promise<any>;
  abstract updateAuthor(authorId: number, authorData: Author): Promise<void>;
  abstract deleteAuthor(authorId: number): Promise<void>;
}

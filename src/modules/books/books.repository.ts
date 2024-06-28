import { Genre, Language } from '@prisma/client';
import { Book } from 'src/entities/book';

export abstract class BooksRepository {
  abstract findById(id: number): Promise<Book | null>;
  abstract findByAuthorId(authorId: number): Promise<Book[] | null>;
  abstract findByGenre(genre: Genre): Promise<Book[] | null>;
  abstract findByLanguage(language: Language): Promise<Book[] | null>;
  abstract create(bookData: Book): Promise<void>;
  abstract update(id: number, bookData: Partial<Book>): Promise<void>;
  abstract delete(id: number): Promise<void>;
}

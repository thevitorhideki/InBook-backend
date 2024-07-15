import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';

export abstract class BooksRepository {
  abstract getBookById(id: number): Promise<Book>;
  abstract getBooksByGenre(genre: Genre, limit?: number): Promise<Book[]>;
  abstract getBooksByRelevance(limit?: number): Promise<Book[]>;
  abstract getBooksByTitle(title: string): Promise<Book[]>;
  abstract createBook(bookData: Book): Promise<void>;
  abstract updateBook(id: number, bookData: Book): Promise<void>;
  abstract deleteBook(id: number): Promise<void>;
}

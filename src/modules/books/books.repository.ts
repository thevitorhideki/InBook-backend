import { Book } from '@database/entities/book';

export abstract class BooksRepository {
  abstract getAllBooks(): Promise<Book[]>;
  abstract getBookById(id: string): Promise<Book>;
  abstract getBooksByTitle(title: string): Promise<Book[]>;
  abstract createBook(bookData: Book): Promise<string>;
  abstract updateBook(id: string, bookData: Book): Promise<void>;
  abstract deleteBook(id: string): Promise<void>;
}

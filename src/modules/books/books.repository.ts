import { Book } from '@/database/entities/book';
import { Genre } from '@/database/enums/genre';

export abstract class BooksRepository {
  abstract getBookById(id: number): Promise<any>;
  abstract getBooksByGenre(genre: Genre, limit?: number): Promise<any[]>;
  abstract createBook(bookData: Book): Promise<void>;
  abstract updateBook(id: number, bookData: Partial<Book>): Promise<void>;
  abstract deleteBook(id: number): Promise<void>;
}

import { Book } from '@/database/entities/book';
import { Genre } from '@/database/enums/genre';
import { Language } from '@/database/enums/language';

export abstract class BooksRepository {
  abstract getBookById(id: number): Promise<any>;
  abstract getBooksByGenre(genre: Genre): Promise<any[]>;
  abstract getBooksByLanguage(language: Language): Promise<any[]>;
  abstract createBook(bookData: Book): Promise<void>;
  abstract updateBook(id: number, bookData: Partial<Book>): Promise<void>;
  abstract deleteBook(id: number): Promise<void>;
}

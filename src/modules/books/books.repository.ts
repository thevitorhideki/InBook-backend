import { Book } from '@/database/entities/book';
import { Genre } from '@/database/enums/genre';
import { UpdateBookDto } from './dto/update-book.dto';

export abstract class BooksRepository {
  abstract getBookById(id: number): Promise<any>;
  abstract getBooksByGenre(genre: Genre, limit?: number): Promise<any[]>;
  abstract createBook(bookData: Book): Promise<void>;
  abstract updateBook(id: number, bookData: UpdateBookDto): Promise<void>;
  abstract deleteBook(id: number): Promise<void>;
}

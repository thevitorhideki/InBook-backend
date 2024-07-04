import { Genre } from '@database/enums/genre';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export abstract class BooksRepository {
  abstract getBookById(id: number): Promise<any>;
  abstract getBooksByGenre(genre: Genre, limit?: number): Promise<any[]>;
  abstract createBook(bookData: CreateBookDto): Promise<void>;
  abstract updateBook(id: number, bookData: UpdateBookDto): Promise<void>;
  abstract deleteBook(id: number): Promise<void>;
}

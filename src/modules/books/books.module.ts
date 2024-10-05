import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { CreateBook } from './services/create-book.service';
import { DeleteBook } from './services/delete-book.service';
import { GetAllBooks } from './services/get-all-books.service';
import { GetBookById } from './services/get-book-by-id.service';
import { GetBookBySlug } from './services/get-book-by-slug.service';
import { GetBooksByTitle } from './services/get-books-by-title.service';
import { UpdateBook } from './services/update-book.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetAllBooks,
    GetBookById,
    GetBooksByTitle,
    GetBookBySlug,
    CreateBook,
    DeleteBook,
    UpdateBook,
  ],
  controllers: [BooksController],
})
export class BooksModule {}

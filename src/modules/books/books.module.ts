import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { CreateBook } from './services/create-book.service';
import { DeleteBook } from './services/delete-book.service';
import { GetBookById } from './services/get-book-by-id.service';
import { GetBooksByGenre } from './services/get-books-by-genre.service';
import { UpdateBook } from './services/update-book.service';

@Module({
  imports: [DatabaseModule],
  providers: [GetBookById, GetBooksByGenre, CreateBook, DeleteBook, UpdateBook],
  controllers: [BooksController],
})
export class BooksModule {}

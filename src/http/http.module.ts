import { DatabaseModule } from '@/database/database.module';
import { CreateAuthor } from '@/modules/authors/services/create-author.service';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { GetBookById } from '@/modules/books/services/get-book-by-id.service';
import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors.controller';
import { BooksController } from './controllers/books.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController, AuthorsController],
  providers: [CreateBook, DeleteBook, GetBookById, CreateAuthor],
})
export class HttpModule {}

import { DatabaseModule } from '@/database/database.module';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [CreateBook, DeleteBook],
})
export class HttpModule {}

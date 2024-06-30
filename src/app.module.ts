import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [BooksModule, AuthorsModule, DatabaseModule],
})
export class AppModule {}

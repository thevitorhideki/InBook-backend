import { AuthorsModule } from '@/modules/authors/authors.module';
import { BooksModule } from '@/modules/books/books.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BooksModule, AuthorsModule],
})
export class HttpModule {}

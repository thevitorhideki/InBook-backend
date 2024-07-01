import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    DatabaseModule,
    ReviewsModule,
    RouterModule.register([
      {
        path: 'books',
        module: BooksModule,
        children: [
          {
            path: ':id/reviews',
            module: ReviewsModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}

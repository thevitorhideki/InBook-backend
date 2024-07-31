import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthorsModule } from '@modules/authors/authors.module';
import { BooksModule } from '@modules/books/books.module';
import { InteractionsModule } from '@modules/interactions/interactions.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { ReviewsModule } from '@modules/reviews/reviews.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    DatabaseModule,
    ReviewsModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    InteractionsModule,
    RouterModule.register([
      {
        path: 'books',
        module: BooksModule,
        children: [
          {
            path: ':bookId/reviews',
            module: ReviewsModule,
          },
        ],
      },
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: 'profiles',
            module: ProfileModule,
          },
          {
            path: 'interactions',
            module: InteractionsModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}

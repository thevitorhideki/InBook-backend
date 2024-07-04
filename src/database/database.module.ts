import { AuthorsRepository } from '@modules/authors/authors.repository';
import { BooksRepository } from '@modules/books/books.repository';
import { ProfileRepository } from '@modules/profile/profile.repository';
import { ReviewsRepository } from '@modules/reviews/reviews.repository';
import { UsersRepository } from '@modules/users/users.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthorsRepository } from './prisma/repositories/prisma-authors.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';
import { PrismaProfileRepository } from './prisma/repositories/prisma-profile.repository';
import { PrismaReviewsRepository } from './prisma/repositories/prisma-reviews.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: BooksRepository,
      useClass: PrismaBooksRepository,
    },
    {
      provide: AuthorsRepository,
      useClass: PrismaAuthorsRepository,
    },
    {
      provide: ReviewsRepository,
      useClass: PrismaReviewsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [
    BooksRepository,
    AuthorsRepository,
    ReviewsRepository,
    UsersRepository,
    ProfileRepository,
  ],
})
export class DatabaseModule {}

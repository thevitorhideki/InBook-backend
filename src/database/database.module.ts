import { AuthorsRepository } from '@/modules/authors/authors.repository';
import { BooksRepository } from '@/modules/books/books.repository';
import { ReviewsRepository } from '@/modules/reviews/reviews.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthorsRepository } from './prisma/repositories/prisma-authors.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';
import { PrismaReviewsRepository } from './prisma/repositories/prisma-reviews.repository';

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
  ],
  exports: [BooksRepository, AuthorsRepository, ReviewsRepository],
})
export class DatabaseModule {}

import { AuthorsRepository } from '@modules/authors/authors.repository';
import { BooksRepository } from '@modules/books/books.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthorsRepository } from './prisma/repositories/prisma-authors.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';

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
  ],
  exports: [BooksRepository, AuthorsRepository],
})
export class DatabaseModule {}

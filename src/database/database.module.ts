import { AuthorsRepository } from '@modules/authors/authors.repository';
import { BooksRepository } from '@modules/books/books.repository';
import { UsersRepository } from '@modules/users/users.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthorsRepository } from './prisma/repositories/prisma-authors.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';
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
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [BooksRepository, AuthorsRepository, UsersRepository],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { BooksRepository } from 'src/modules/books/books.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: BooksRepository,
      useClass: PrismaBooksRepository,
    },
  ],
  exports: [BooksRepository],
})
export class DatabaseModule {}

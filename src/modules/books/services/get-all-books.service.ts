import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookDetailsDto } from '../dto/book-details.dto';

@Injectable()
export class GetAllBooks {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(): Promise<BookDetailsDto[]> {
    const books = await this.booksRepository.getAllBooks();

    return books.map(BookDetailsDto.fromEntity);
  }
}

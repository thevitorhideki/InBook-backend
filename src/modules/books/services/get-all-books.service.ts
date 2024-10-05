import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookCollectionDto } from '../dto/book-collection.dto';

@Injectable()
export class GetAllBooks {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(): Promise<BookCollectionDto> {
    const books = await this.booksRepository.getAllBooks();

    return BookCollectionDto.fromEntity(books);
  }
}

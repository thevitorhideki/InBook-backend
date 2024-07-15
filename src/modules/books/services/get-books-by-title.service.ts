import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookCollectionDto } from '../dto/book-collection.dto';

@Injectable()
export class GetBooksByTitle {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(title: string): Promise<BookCollectionDto> {
    const books = await this.booksRepository.getBooksByTitle(title);

    return BookCollectionDto.fromEntity(books);
  }
}

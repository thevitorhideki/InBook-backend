import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookCollectionDto } from '../dto/book-collection.dto';

interface IGetBooksByRelevanceRequest {
  limit?: number;
}

@Injectable()
export class GetBooksByRelevance {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(
    request: IGetBooksByRelevanceRequest,
  ): Promise<BookCollectionDto> {
    const { limit } = request;

    const books = await this.booksRepository.getBooksByRelevance(limit);

    return BookCollectionDto.fromEntity(books);
  }
}

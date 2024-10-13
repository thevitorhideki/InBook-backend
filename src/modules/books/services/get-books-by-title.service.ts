import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookDetailsDto } from '../dto/book-details.dto';

interface GetBooksByTitleRequest {
  title: string;
}

@Injectable()
export class GetBooksByTitle {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: GetBooksByTitleRequest): Promise<BookDetailsDto[]> {
    const { title } = request;

    const books = await this.booksRepository.getBooksByTitle(title);

    return books.map(BookDetailsDto.fromEntity);
  }
}

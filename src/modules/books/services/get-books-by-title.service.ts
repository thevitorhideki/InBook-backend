import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookCollectionDto } from '../dto/book-collection.dto';

interface GetBooksByTitleRequest {
  title: string;
}

@Injectable()
export class GetBooksByTitle {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: GetBooksByTitleRequest): Promise<BookCollectionDto> {
    const { title } = request;

    const books = await this.booksRepository.getBooksByTitle(title);

    return BookCollectionDto.fromEntity(books);
  }
}

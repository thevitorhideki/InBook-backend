import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookDetailsDto } from '../dto/book-details.dto';

interface IGetBookByIdRequest {
  bookId: string;
}

@Injectable()
export class GetBookById {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IGetBookByIdRequest): Promise<BookDetailsDto> {
    const { bookId } = request;

    const book = await this.booksRepository.getBookById(bookId);

    return BookDetailsDto.fromEntity(book);
  }
}

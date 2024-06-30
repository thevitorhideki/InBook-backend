import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { UpdateBookDto } from '../dto/update-book.dto';

interface IUpdateBookRequest {
  bookId: number;
  bookData: UpdateBookDto;
}

type IUpdateBookResponse = void;

@Injectable()
export class UpdateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IUpdateBookRequest): Promise<IUpdateBookResponse> {
    const { bookId, bookData } = request;

    await this.booksRepository.updateBook(bookId, bookData);
  }
}

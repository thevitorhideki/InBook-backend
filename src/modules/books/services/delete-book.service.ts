import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';

interface IDeleteBookRequest {
  bookId: string;
}

type IDeleteBookResponse = void;

@Injectable()
export class DeleteBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IDeleteBookRequest): Promise<IDeleteBookResponse> {
    const { bookId } = request;

    await this.booksRepository.deleteBook(bookId);
  }
}

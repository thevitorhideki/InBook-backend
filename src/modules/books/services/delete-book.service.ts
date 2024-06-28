import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '../books.repository';

interface IDeleteBookRequest {
  bookId: number;
}

type IDeleteBookResponse = void;

@Injectable()
export class DeleteBook {
  constructor(private booksRepository: BooksRepository) {}

  async execute(request: IDeleteBookRequest): Promise<IDeleteBookResponse> {
    const { bookId } = request;

    const book = await this.booksRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.booksRepository.delete(bookId);
  }
}

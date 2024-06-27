import { Book } from '@/entities/book';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '../books.repository';

interface IGetBookByIdRequest {
  bookId: number;
}

type GetBookByIdResponse = Book | null;

@Injectable()
export class GetBookById {
  constructor(private booksRepository: BooksRepository) {}

  async execute(request: IGetBookByIdRequest): Promise<GetBookByIdResponse> {
    const { bookId } = request;

    const book = await this.booksRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}

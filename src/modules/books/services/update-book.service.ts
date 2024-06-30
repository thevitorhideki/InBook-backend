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

    const existingBook = await this.booksRepository.getBookById(bookId);

    if (!bookData.authorId) {
      bookData.authorId = existingBook.authorId;
    }

    await this.booksRepository.updateBook(bookId, bookData);
  }
}

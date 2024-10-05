import { Book } from '@database/entities/book';
import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/utils/generate-slug';
import { BooksRepository } from '../books.repository';
import { UpdateBookDto } from '../dto/update-book.dto';

interface IUpdateBookRequest {
  bookId: string;
  bookData: UpdateBookDto;
}

type IUpdateBookResponse = void;

@Injectable()
export class UpdateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IUpdateBookRequest): Promise<IUpdateBookResponse> {
    const { bookId, bookData } = request;
    const slug = generateSlug(bookData.title);

    const book = new Book({ ...bookData, slug });

    await this.booksRepository.updateBook(bookId, book);
  }
}

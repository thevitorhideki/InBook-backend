import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class CreateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: CreateBookDto): Promise<void> {
    await this.booksRepository.createBook(request);
  }
}

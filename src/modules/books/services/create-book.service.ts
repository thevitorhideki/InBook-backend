import { Book } from '@database/entities/book';
import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/utils/generate-slug';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

interface CreateBookResponse {
  bookId: string;
}

@Injectable()
export class CreateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: CreateBookDto): Promise<CreateBookResponse> {
    const { title, authorId } = request;
    const slug = generateSlug(title);

    const book = new Book({
      title,
      slug,
      authorId,
    });

    const bookId = await this.booksRepository.createBook(book);

    return { bookId };
  }
}

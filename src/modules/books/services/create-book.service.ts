import { Book } from '@database/entities/book';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

interface CreateBookResponse {
  bookId: number;
}

@Injectable()
export class CreateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: CreateBookDto): Promise<CreateBookResponse> {
    const {
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      ebookFileUrl,
      audiobookFileUrl,
      authorId,
    } = request;

    const book = new Book({
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      ebookFileUrl,
      audiobookFileUrl,
      authorId,
    });

    const bookId = await this.booksRepository.createBook(book);

    return { bookId };
  }
}

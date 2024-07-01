import { Book } from '@/database/entities/book';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

interface ICreateBookResponse {
  book: Book;
}

@Injectable()
export class CreateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: CreateBookDto): Promise<ICreateBookResponse> {
    const book = new Book({
      title: request.title,
      description: request.description,
      genres: request.genres,
      language: request.language,
      pages: request.pages,
      duration: request.duration,
      publicationYear: request.publicationYear,
      coverImageUrl: request.coverImageUrl,
      ebookFileUrl: request.ebookFileUrl,
      audiobookFileUrl: request.audiobookFileUrl,
      authorId: request.authorId,
    });

    await this.booksRepository.createBook(book);

    return { book };
  }
}

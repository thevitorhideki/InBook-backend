import { Book } from '@/database/entities/book';
import { AuthorsRepository } from '@/modules/authors/authors.repository';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

interface ISendBookResponse {
  book: Book;
}

@Injectable()
export class CreateBook {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  async execute(request: CreateBookDto): Promise<ISendBookResponse> {
    const author = await this.authorsRepository.getAuthorById(request.authorId);

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
      author: author,
      reviews: [],
      interactions: [],
    });

    await this.booksRepository.createBook(book);

    return { book };
  }
}

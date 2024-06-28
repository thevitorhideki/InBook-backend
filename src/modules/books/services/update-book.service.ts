import { AuthorsRepository } from '@/modules/authors/authors-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre, Language } from '@prisma/client';
import { BooksRepository } from '../books.repository';

interface IUpdateBookRequest {
  bookId: number;
  bookData: {
    title?: string | null;
    description?: string | null;
    genres?: Genre[] | null;
    language?: Language | null;
    pages?: number | null;
    duration?: number | null;
    publicationYear?: number | null;
    coverImageUrl?: string | null;
    ebookFileUrl?: string | null;
    audiobookFileUrl?: string | null;
    authorId?: number | null;
  };
}

type IUpdateBookResponse = void;

@Injectable()
export class UpdateBook {
  constructor(
    private booksRepository: BooksRepository,
    private authorsRepository: AuthorsRepository,
  ) {}

  async execute(request: IUpdateBookRequest): Promise<IUpdateBookResponse> {
    const { bookId, bookData } = request;

    const existingBook = await this.booksRepository.findById(bookId);

    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    if (bookData.authorId) {
      const authorExists = await this.authorsRepository.getAuthorById(
        bookData.authorId,
      );

      if (!authorExists) {
        throw new NotFoundException('Author not found');
      }
    } else {
      bookData.authorId = existingBook.authorId;
    }

    await this.booksRepository.update(bookId, bookData);
  }
}

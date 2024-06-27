import { Book } from '@/entities/book';
import { Injectable } from '@nestjs/common';
import { Genre, Language } from '@prisma/client';
import { BooksRepository } from '../books.repository';

interface ICreateBookRequest {
  title: string;
  description: string;
  genres: Genre[];
  language: Language;
  pages: number;
  duration: number;
  publicationYear?: number | null;
  coverImageUrl?: string | null;
  ebookFileUrl?: string | null;
  audiobookFileUrl?: string | null;
  authorId: number;
}

interface ISendNotificationResponse {
  book: Book;
}

@Injectable()
export class CreateBook {
  constructor(private booksRepository: BooksRepository) {}

  async execute(
    request: ICreateBookRequest,
  ): Promise<ISendNotificationResponse> {
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

    await this.booksRepository.create(book);

    return { book };
  }
}

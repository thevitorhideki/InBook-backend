import { Book } from 'src/entities/book';
import { Book as RawBook } from '@prisma/client';

export class PrismaBookMapper {
  static toPrisma(book: Book) {
    return {
      title: book.title,
      description: book.description,
      genres: book.genres,
      language: book.language,
      pages: book.pages,
      duration: book.duration,
      publicationYear: book.publicationYear,
      author: {
        connect: { id: book.authorId },
      },
    };
  }

  static toEntity(raw: RawBook): Book {
    return new Book({
      title: raw.title,
      description: raw.description,
      genres: raw.genres,
      language: raw.language,
      pages: raw.pages,
      duration: raw.duration,
      publicationYear: raw.publicationYear,
      coverImageUrl: raw.coverImageUrl,
      ebookFileUrl: raw.ebookFileUrl,
      audiobookFileUrl: raw.audiobookFileUrl,
      authorId: raw.authorId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}

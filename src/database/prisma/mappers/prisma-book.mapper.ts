import { Author } from '@/database/entities/author';
import { Book } from '@/database/entities/book';
import { Review } from '@/database/entities/review';
import { UserBookInteraction } from '@/database/entities/user-book-interaction';
import { Genre } from '@/database/enums/genre';
import { Language } from '@/database/enums/language';

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
      coverImageUrl: book.coverImageUrl,
      ebookFileUrl: book.ebookFileUrl,
      audiobookFileUrl: book.audiobookFileUrl,
      authorId: book.authorId,
    };
  }

  static toEntity(raw: any): Book {
    return new Book(
      {
        title: raw.title,
        description: raw.description,
        genres: raw.genres as Genre[],
        language: raw.language as Language,
        pages: raw.pages,
        duration: raw.duration,
        publicationYear: raw.publicationYear,
        coverImageUrl: raw.coverImageUrl,
        ebookFileUrl: raw.ebookFileUrl,
        audiobookFileUrl: raw.audiobookFileUrl,
        authorId: raw.authorId,
        author: raw.author as Author,
        reviews: raw.reviews as Review[],
        interactions: raw.interactions as UserBookInteraction[],
      },
      raw.id,
    );
  }
}

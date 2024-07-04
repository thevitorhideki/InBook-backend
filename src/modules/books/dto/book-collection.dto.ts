import { Author } from '@database/entities/author';
import { Book } from '@database/entities/book';

export class BookCollectionDto {
  books: {
    title: string;
    author: {
      name: string;
    };
    pages: number;
    duration: number;
    coverImageUrl?: string;
  }[];

  static fromEntity(books: Book[], author?: Author): BookCollectionDto {
    return {
      books: books.map((book) => ({
        title: book.title,
        author: {
          name: author?.name || book.author.name,
        },
        pages: book.pages,
        duration: book.duration,
        coverImageUrl: book.coverImageUrl,
      })),
    };
  }
}

import { Author } from '@database/entities/author';
import { Book } from '@database/entities/book';

export class BookCollectionDto {
  books: {
    id: string;
    title: string;
    slug: string;
    author: {
      name: string;
    };
  }[];

  static fromEntity(books: Book[], author?: Author): BookCollectionDto {
    return {
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        author: {
          name: author?.name || book.author.name,
        },
      })),
    };
  }
}

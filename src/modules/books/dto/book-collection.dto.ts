import { Book } from '@database/entities/book';

export class BookCollectionDto {
  books: {
    id: string;
    title: string;
    slug: string;
    authors: {
      id: string;
      name: string;
    }[];
  }[];

  static fromEntity(books: Book[]): BookCollectionDto {
    return {
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        authors: book.authors.map((author) => {
          return {
            id: author.id,
            name: author.name,
          };
        }),
      })),
    };
  }
}

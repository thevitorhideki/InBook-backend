import { Book } from '@database/entities/book';

export class BookDetailsDto {
  id: string;
  title: string;
  slug: string;
  authors: {
    authorId: string;
    name: string;
    books: Book[];
  }[];
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(book: Book): BookDetailsDto {
    const { id, title, slug, authors, createdAt, updatedAt } = book;

    return {
      id,
      title,
      slug,
      authors: authors.map((author) => {
        return {
          authorId: author.id,
          name: author.name,
          books: author.books,
        };
      }),
      createdAt,
      updatedAt,
    };
  }
}

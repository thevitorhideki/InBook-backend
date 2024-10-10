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

  static fromEntity(entity: Book): BookDetailsDto {
    const { id, title, slug, authors } = entity;

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
    };
  }
}

import { Author } from '@database/entities/author';

export class AuthorDetailsDto {
  id: string;
  name: string;
  books?: {
    id: string;
    title: string;
    slug: string;
  }[];
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(author: Author): AuthorDetailsDto {
    const { id, name, books, createdAt, updatedAt } = author;

    return {
      id: id,
      name: name,
      books: books?.map((book) => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
      })),
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }
}

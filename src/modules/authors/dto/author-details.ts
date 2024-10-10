import { Author } from '@database/entities/author';

export class AuthorDetailsDto {
  name: string;
  books?: {
    id: string;
    title: string;
    slug: string;
  }[];

  static fromEntity(author: Author): AuthorDetailsDto {
    return {
      name: author.name,
      books: author.books?.map((book) => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
      })),
    };
  }
}

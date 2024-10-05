import { Book } from '@database/entities/book';

export class BookDetailsDto {
  id: string;
  title: string;
  slug: string;
  author: {
    authorId: string;
    name: string;
    books: Book[];
  };

  static fromEntity(entity: Book): BookDetailsDto {
    const { id, title, slug, author } = entity;

    return {
      id,
      title,
      slug,
      author: {
        authorId: author.id,
        name: author.name,
        books: author.books,
      },
    };
  }
}

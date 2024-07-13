import { Author } from '@database/entities/author';

export class AuthorDetailsDto {
  name: string;
  avatarUrl?: string;
  about?: string;
  birthYear?: number;
  nationality?: string;
  books: {
    id: number;
    title: string;
    pages: number;
    duration: number;
    coverImageUrl?: string;
  }[];

  static fromEntity(author: Author): AuthorDetailsDto {
    return {
      name: author.name,
      avatarUrl: author.avatarUrl,
      about: author.about,
      birthYear: author.birthYear,
      nationality: author.nationality,
      books: author.books.map((book) => ({
        id: book.id,
        title: book.title,
        pages: book.pages,
        duration: book.duration,
        coverImageUrl: book.coverImageUrl,
      })),
    };
  }
}

import { Author } from '@database/entities/author';
import { Book } from '@database/entities/book';

export class PrismaBookMapper {
  static toPrisma(book: Book) {
    return {
      title: book.title,
      slug: book.slug,
      authorId: book.authorId,
    };
  }

  static toEntity(raw: any): Book {
    return new Book(
      {
        title: raw.title,
        slug: raw.slug,
        authorId: raw.authorId,
        author: {
          id: raw.author.id,
          name: raw.author.name,
          books: raw.author.books?.map((book) => {
            return {
              id: book.id,
              title: book.title,
            } as Book;
          }),
        } as Author,
      },
      raw.id,
    );
  }
}

import { Book } from '@database/entities/book';

export class PrismaBookMapper {
  static toPrisma(book: Book) {
    return {
      title: book.title,
      slug: book.slug,
      authors: book.authors,
    };
  }

  static toEntity(raw: any): Book {
    return new Book(
      {
        title: raw.title,
        slug: raw.slug,
        authors: raw.authors.map((author) => {
          return {
            id: author.id,
            name: author.name,
            books: author.books?.map((book) => {
              return {
                id: book.id,
                title: book.title,
              } as Book;
            }),
          };
        }),
      },
      raw.id,
    );
  }
}

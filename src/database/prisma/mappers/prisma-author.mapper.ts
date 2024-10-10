import { Author } from '@database/entities/author';
import { Book } from '@database/entities/book';
import { CreateAuthorDto } from '@modules/authors/dto/create-author.dto';

export class PrismaAuthorMapper {
  static toPrisma(author: CreateAuthorDto) {
    return {
      name: author.name,
    };
  }

  static toEntity(raw: any): Author {
    return new Author(
      {
        name: raw.name,
        books: raw.books?.map((book: Book) => {
          return {
            id: book.id,
            title: book.title,
            slug: book.slug,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
          };
        }),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}

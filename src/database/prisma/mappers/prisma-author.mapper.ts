import { Author } from '@database/entities/author';
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
        books: raw.books,
      },
      raw.id,
    );
  }
}

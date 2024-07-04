import { Author } from '@database/entities/author';
import { CreateAuthorDto } from '@modules/authors/dto/create-author.dto';

export class PrismaAuthorMapper {
  static toPrisma(author: CreateAuthorDto) {
    return {
      name: author.name,
      avatarUrl: author.avatarUrl,
      about: author.about,
      birthYear: author.birthYear,
      nationality: author.nationality,
    };
  }

  static toEntity(raw: any): Author {
    return new Author(
      {
        name: raw.name,
        avatarUrl: raw.avatarUrl,
        about: raw.about,
        birthYear: raw.birthYear,
        nationality: raw.nationality,
        books: raw.books,
      },
      raw.id,
    );
  }
}

import { Author } from '@/entities/author';
import { Author as RawAuthor } from '@prisma/client';

export class PrismaAuthorMapper {
  static toPrisma(author: Author) {
    return {
      name: author.name,
      avatarUrl: author.avatarUrl,
      about: author.about,
      birthYear: author.birthYear,
      nationality: author.nationality,
    };
  }

  static toEntity(raw: RawAuthor): Author {
    return new Author({
      name: raw.name,
      avatarUrl: raw.avatarUrl,
      about: raw.about,
      birthYear: raw.birthYear,
      nationality: raw.nationality,
    });
  }
}

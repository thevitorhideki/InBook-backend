import { Author } from '@/entities/author';

export class AuthorViewModel {
  static toHTTP(author: Author) {
    return {
      name: author.name,
      avatarUrl: author.avatarUrl,
      about: author.about,
      birthYear: author.birthYear,
      nationality: author.nationality,
    };
  }
}

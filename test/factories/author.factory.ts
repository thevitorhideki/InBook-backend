import { Author, IAuthorProps } from '@/database/entities/author';

type Override = Partial<IAuthorProps>;

export function makeAuthor(override: Override = {}) {
  return new Author(
    {
      name: 'J.K. Rowling',
      avatarUrl: 'https://example.com/avatar1.jpg',
      about: 'Author of Harry Potter series',
      birthYear: 1965,
      nationality: 'British',
      ...override,
    },
    9999,
  );
}

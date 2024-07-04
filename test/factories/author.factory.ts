import { IAuthorProps } from '@database/entities/author';
import { CreateAuthorDto } from '@modules/authors/dto/create-author.dto';

type Override = Partial<IAuthorProps>;

export function makeAuthor(override: Override = {}) {
  const author: CreateAuthorDto = {
    name: 'J.K. Rowling',
    avatarUrl: 'https://example.com/avatar1.jpg',
    about: 'Author of Harry Potter series',
    birthYear: 1965,
    nationality: 'British',
    ...override,
  };

  return author;
}

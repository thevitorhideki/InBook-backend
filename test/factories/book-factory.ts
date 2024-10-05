import { Book, IBookProps } from '@database/entities/book';
import { randomUUID } from 'node:crypto';
import { makeAuthor } from './author-factory';

type Override = Partial<IBookProps>;

export function makeBook(override: Override = {}) {
  const authorId = randomUUID();

  return new Book({
    title: "Harry Potter and the Philosopher's Stone",
    slug: 'harry-potter-and-the-philosophers-stone',
    authorId,
    author: makeAuthor({}, authorId),
    ...override,
  });
}

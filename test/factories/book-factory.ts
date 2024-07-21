import { Book, IBookProps } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { randomUUID } from 'node:crypto';
import { makeAuthor } from './author-factory';

type Override = Partial<IBookProps>;

export function makeBook(override: Override = {}) {
  const authorId = randomUUID();

  return new Book({
    title: "Harry Potter and the Philosopher's Stone",
    description: 'First book in the Harry Potter series.',
    genres: [Genre.ADVENTURE, Genre.CLASSIC],
    language: Language.ENGLISH,
    pages: 223,
    duration: 40740000, // Example duration in milliseconds for audiobook
    publicationYear: 1997,
    coverImageUrl: 'https://example.com/cover1.jpg',
    ebookFileUrl: 'https://example.com/ebook1.pdf',
    audiobookFileUrl: 'https://example.com/audiobook1.mp3',
    authorId,
    author: makeAuthor({}, authorId),
    ...override,
  });
}

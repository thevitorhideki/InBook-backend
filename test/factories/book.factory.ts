import { Author } from '@/database/entities/author';
import { Book, IBookProps } from '@/database/entities/book';
import { Genre } from '@/database/enums/genre';
import { Language } from '@/database/enums/language';
import { makeAuthor } from './author.factory';

type Override = Partial<IBookProps>;

export function makeBook(
  override: Override = {},
  author: Author = makeAuthor(),
) {
  return new Book(
    {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: 130, // Example duration in minutes for audiobook
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: 9999,
      author,
      ...override,
    },
    9999,
  );
}

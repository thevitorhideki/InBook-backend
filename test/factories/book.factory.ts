import { Book, IBookProps } from '@/entities/book';

type Override = Partial<IBookProps>;

export function makeBook(override: Override = {}) {
  return new Book(
    {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: ['ADVENTURE', 'FANFIC'],
      language: 'ENGLISH',
      pages: 223,
      duration: 130, // Example duration in minutes for audiobook
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: 1,
      ...override,
    },
    1,
  );
}

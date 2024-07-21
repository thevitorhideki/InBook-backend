import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { randomUUID } from 'crypto';
import { Book } from './book';

describe('Book', () => {
  it('should be able to create a new Book', () => {
    const book = new Book({
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: 120,
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    });

    expect(book).toBeInstanceOf(Book);
  });

  it('should not be able to create a book with invalid number of pages', () => {
    const book1 = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 0,
      duration: 120,
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    };

    const book2 = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: -100,
      duration: 120,
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    };

    expect(() => {
      return new Book(book1);
    }).toThrow();
    expect(() => {
      return new Book(book2);
    }).toThrow();
  });

  it('should not be able to create a book with invalid duration value', () => {
    const book1 = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: 0,
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    };

    const book2 = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: -122,
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    };

    expect(() => {
      return new Book(book1);
    }).toThrow();
    expect(() => {
      return new Book(book2);
    }).toThrow();
  });

  it('should not be able to create a book with publication year in the future', () => {
    const book = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: 120,
      publicationYear: 2999,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    };

    expect(() => {
      return new Book(book);
    }).toThrow();
  });
});

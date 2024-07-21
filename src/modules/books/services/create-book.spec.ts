import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { randomUUID } from 'crypto';
import { CreateBook } from './create-book.service';

describe('Create Book', () => {
  it('should be able to create a book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const createBook = new CreateBook(booksRepository);

    const { bookId } = await createBook.execute({
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: [Genre.ADVENTURE, Genre.CLASSIC],
      language: Language.ENGLISH,
      pages: 223,
      duration: 120, // Example duration in minutes for audiobook
      publicationYear: 1997,
      coverImageUrl: 'https://example.com/cover1.jpg',
      ebookFileUrl: 'https://example.com/ebook1.pdf',
      audiobookFileUrl: 'https://example.com/audiobook1.mp3',
      authorId: randomUUID(),
    });

    expect(bookId).toBeDefined();
  });
});

import { Author } from '@/entities/author';
import { Book } from '@/entities/book';
import { makeAuthor } from '@test/factories/author.factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors.repository';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books.repository';
import { CreateBook } from './create-book.service';

describe('Create book', () => {
  let author: Author;
  const authorsRepository = new InMemoryAuthorsRepository();
  const booksRepository = new InMemoryBooksRepository();
  const createBook = new CreateBook(booksRepository, authorsRepository);

  beforeEach(async () => {
    author = makeAuthor();
    await authorsRepository.createAuthor(author);
  });

  it('should be able to create a book', async () => {
    const { book } = await createBook.execute({
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
      authorId: 9999,
    });

    expect(book).toBeInstanceOf(Book);
  });
});

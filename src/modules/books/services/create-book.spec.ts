import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { randomUUID } from 'crypto';
import { CreateBook } from './create-book.service';

describe('Create Book', () => {
  it('should be able to create a book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const createBook = new CreateBook(booksRepository);

    const { bookId } = await createBook.execute({
      title: "Harry Potter and the Philosopher's Stone",
      authorId: randomUUID(),
    });

    expect(bookId).toBeDefined();
  });
});

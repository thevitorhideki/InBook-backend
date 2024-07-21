import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetBooksByTitle } from './get-books-by-title.service';

describe('Get Books by Title', () => {
  it('should be able to get books by title', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getBooksByTitle = new GetBooksByTitle(booksRepository);

    const book1 = makeBook({ title: 'Hello World' });
    const book2 = makeBook({ title: 'Hello' });

    await booksRepository.createBook(book1);
    await booksRepository.createBook(book2);

    const { books } = await getBooksByTitle.execute({ title: 'Hello' });

    expect(books).toHaveLength(2);
  });
});

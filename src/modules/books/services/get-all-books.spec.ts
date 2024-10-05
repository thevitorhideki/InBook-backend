import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetAllBooks } from './get-all-books.service';

describe('Get all books', () => {
  it('should be able to get all the books', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getAllBooks = new GetAllBooks(booksRepository);

    const book1 = makeBook({ title: 'Hello World' });
    const book2 = makeBook({ title: 'Hello' });

    await booksRepository.createBook(book1);
    await booksRepository.createBook(book2);

    const { books } = await getAllBooks.execute();

    expect(books).toHaveLength(2);
  });
});

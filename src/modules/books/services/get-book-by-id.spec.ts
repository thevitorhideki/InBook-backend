import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetBookById } from './get-book-by-id.service';

describe('Get Book by id', () => {
  it('should be able to get a book by its id', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getBookById = new GetBookById(booksRepository);

    const book = makeBook();

    await booksRepository.createBook(book);

    await getBookById.execute({ bookId: book.id });

    expect(booksRepository.books[0]).toBe(book);
  });
});

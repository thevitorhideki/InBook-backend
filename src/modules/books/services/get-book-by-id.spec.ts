import { Book } from '@/entities/book';
import { makeBook } from '@test/factories/book.factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books.repository';
import { GetBookById } from './get-book-by-id.service';

describe('Get Book by Id', () => {
  let book: Book;
  const booksRepository = new InMemoryBooksRepository();
  const getBookById = new GetBookById(booksRepository);

  beforeEach(async () => {
    book = makeBook();
    await booksRepository.create(book);
  });

  it('should be able to get a book by id', async () => {
    const bookResponse = await getBookById.execute({ bookId: book.id });

    expect(bookResponse).toEqual(book);
  });

  it('should not be able to get a non-existent book', async () => {
    const bookResponse = getBookById.execute({ bookId: 0 });

    await expect(bookResponse).rejects.toThrow('Book not found');
  });
});

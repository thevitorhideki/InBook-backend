import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { DeleteBook } from './delete-book.service';

describe('Delete book', () => {
  it('should be able to delete a book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const deleteBook = new DeleteBook(booksRepository);

    const book = makeBook();

    await booksRepository.createBook(book);

    await deleteBook.execute({ bookId: book.id });

    expect(booksRepository.books).toHaveLength(0);
  });
});

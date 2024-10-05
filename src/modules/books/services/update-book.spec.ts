import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { UpdateBook } from './update-book.service';

describe('Update Book', () => {
  it('should be able to update a book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const updateBook = new UpdateBook(booksRepository);

    const book = makeBook();

    await booksRepository.createBook(book);

    await updateBook.execute({
      bookId: book.id,
      bookData: {
        title: 'Hello World',
        authorId: book.authorId,
      },
    });

    expect(booksRepository.books[0].title).toBe('Hello World');
  });
});

import { Book } from '@/entities/book';
import { NotFoundException } from '@nestjs/common';
import { makeBook } from '@test/factories/book.factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books.repository';
import { DeleteBook } from './delete-book.service';

describe('Remove BOok', () => {
  let book: Book;
  const booksRepository = new InMemoryBooksRepository();
  const deleteBook = new DeleteBook(booksRepository);

  beforeEach(async () => {
    book = makeBook();
    await booksRepository.create(book);
  });

  it('should be able to delete an existent book', async () => {
    await deleteBook.execute({ bookId: book.id });

    expect(await booksRepository.findById(book.id)).toBeNull();
  });

  it('should not be able to delete a non-existent book', async () => {
    await expect(deleteBook.execute({ bookId: 5 })).rejects.toThrow(
      NotFoundException,
    );
  });
});

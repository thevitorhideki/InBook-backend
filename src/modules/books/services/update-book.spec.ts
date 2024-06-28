import { Author } from '@/entities/author';
import { Book } from '@/entities/book';
import { makeAuthor } from '@test/factories/author.factory';
import { makeBook } from '@test/factories/book.factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors.repository';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books.repository';
import { UpdateBook } from './update-book.service';

describe('Update Book', () => {
  let book: Book;
  let author: Author;
  const authorsRepository = new InMemoryAuthorsRepository();
  const booksRepository = new InMemoryBooksRepository();
  const updateBook = new UpdateBook(booksRepository, authorsRepository);

  beforeEach(async () => {
    author = makeAuthor();
    await authorsRepository.createAuthor(author);
    book = makeBook();
    await booksRepository.create(book);
  });

  it('should be able to update a book with valid data', async () => {
    const updatedBook = makeBook({
      title: 'Harry Potter and the Chamber of Secrets',
    });

    await updateBook.execute({ bookId: book.id, bookData: updatedBook });

    const bookResponse = await booksRepository.findById(book.id);

    expect(bookResponse.title).toEqual(updatedBook.title);
  });
});

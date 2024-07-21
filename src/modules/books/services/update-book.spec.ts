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
        description: book.description,
        genres: book.genres,
        language: book.language,
        pages: book.pages,
        duration: book.duration,
        publicationYear: book.publicationYear,
        coverImageUrl: book.coverImageUrl,
        ebookFileUrl: book.ebookFileUrl,
        audiobookFileUrl: book.audiobookFileUrl,
        authorId: book.authorId,
      },
    });

    expect(booksRepository.books[0].title).toBe('Hello World');
  });
});

import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetBookBySlug } from './get-book-by-slug.service';

describe('Get Book by slug', () => {
  it('should be able to get a book by its slug', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getBookBySlug = new GetBookBySlug(booksRepository);

    const book = makeBook();

    await booksRepository.createBook(book);

    const bookResponse = await getBookBySlug.execute({ slug: book.slug });

    expect(bookResponse.title).toBe(book.title);
  });
});

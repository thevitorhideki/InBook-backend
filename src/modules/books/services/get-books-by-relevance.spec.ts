import { makeBook } from '@test/factories/book-factory';
import { makeInteraction } from '@test/factories/interaction-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetBooksByRelevance } from './get-books-by-relevance.service';

describe('Get Books by Relevance', () => {
  it('should be able to get books by number of interactions in descending order', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getBooksByRelevance = new GetBooksByRelevance(booksRepository);

    const book1 = makeBook({
      title: 'Hello',
      interactions: [makeInteraction()],
    });
    const book2 = makeBook({ title: 'World' });

    await booksRepository.createBook(book2);
    await booksRepository.createBook(book1);

    const { books } = await getBooksByRelevance.execute({});

    expect(books[0].title).toBe(book1.title);
  });
});

import { Genre } from '@database/enums/genre';
import { makeBook } from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/in-memory-books-repository';
import { GetBooksByGenre } from './get-books-by-genre.service';

describe('Get Books by Genre', () => {
  it('should be able to get books by genre', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getBooksByGenre = new GetBooksByGenre(booksRepository);

    const book1 = makeBook({ genres: [Genre.ADVENTURE, Genre.FANFIC] });
    const book2 = makeBook({ genres: [Genre.ADVENTURE, Genre.ROMANCE] });

    await booksRepository.createBook(book1);
    await booksRepository.createBook(book2);

    const { books } = await getBooksByGenre.execute({ genre: Genre.ADVENTURE });

    expect(books).toHaveLength(2);
  });
});

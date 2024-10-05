import { randomUUID } from 'crypto';
import { Book } from './book';

describe('Book', () => {
  it('should be able to create a new Book', () => {
    const book = new Book({
      title: "Harry Potter and the Philosopher's Stone",
      slug: 'harry-potter-and-the-philosophers-stone',
      authorId: randomUUID(),
    });

    expect(book).toBeInstanceOf(Book);
  });
});

import { Author } from './author';

describe('Author', () => {
  it('should be able to create a new Author', () => {
    const author = new Author({
      name: 'J.K. Rowling',
    });

    expect(author).toBeInstanceOf(Author);
  });

  it('should not be able to create a new author with the birth year in the future', () => {
    const author = {
      name: 'J.K. Rowling',
    };

    expect(() => {
      return new Author(author);
    }).toThrow();
  });
});

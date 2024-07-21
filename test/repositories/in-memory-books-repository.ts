import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { BooksRepository } from '@modules/books/books.repository';

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = [];

  async getBookById(id: number): Promise<Book> {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      return null;
    }

    return book;
  }

  async getBooksByGenre(genre: Genre, limit?: number): Promise<Book[]> {
    const books = this.books.filter((book) => book.genres.includes(genre));

    return books.slice(0, limit);
  }

  async getBooksByRelevance(limit?: number): Promise<Book[]> {
    const books = this.books.sort(
      (book1, book2) => book2.interactions.length - book1.interactions.length,
    );

    return books.slice(0, limit);
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    const books = this.books.filter((book) => book.title.includes(title));

    return books;
  }

  async createBook(bookData: Book): Promise<number> {
    const bookId = this.books.push(bookData);

    return bookId;
  }

  async updateBook(id: number, bookData: Book): Promise<void> {
    const bookId = this.books.findIndex((book) => book.id === id);

    this.books[bookId] = bookData;
  }

  async deleteBook(id: number): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    this.books.splice(bookIndex);
  }
}

import { Book } from '@database/entities/book';
import { BooksRepository } from '@modules/books/books.repository';

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = [];

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }

  async getBookById(id: string): Promise<Book> {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      return null;
    }

    return book;
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    const books = this.books.filter((book) => book.title.includes(title));

    return books;
  }

  async createBook(bookData: Book): Promise<string> {
    const bookIndex = this.books.push(bookData);
    const book = this.books[bookIndex];

    return book.id;
  }

  async updateBook(id: string, bookData: Book): Promise<void> {
    const bookId = this.books.findIndex((book) => book.id === id);

    this.books[bookId] = bookData;
  }

  async deleteBook(id: string): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    this.books.splice(bookIndex);
  }
}

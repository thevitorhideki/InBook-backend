import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { BooksRepository } from '@modules/books/books.repository';
import { NotFoundException } from '@nestjs/common';

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = [];

  async getBookById(id: number): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id);

    return book || null;
  }

  async getBooksByGenre(genre: string): Promise<Book[]> {
    return this.books.filter((book) => book.genres.includes(Genre[genre]));
  }

  async getBooksByLanguage(language: Language): Promise<Book[]> {
    return this.books.filter((book) => book.language === language);
  }

  async createBook(bookData: Book): Promise<void> {
    this.books.push(bookData);
  }

  async updateBook(id: number, bookData: Book): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.books[bookIndex] = bookData;
  }

  async deleteBook(id: number): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.books.splice(bookIndex, 1);
  }
}

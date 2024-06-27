import { Book } from '@/entities/book';
import { BooksRepository } from '@/modules/books/books.repository';
import { Genre, Language } from '@prisma/client';

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = [];

  async findById(id: number): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      return null;
    }

    return book;
  }

  async findByAuthorId(authorId: number): Promise<Book[]> {
    const books = this.books.find((book) => book.authorId === authorId);

    if (!books) {
      return [];
    }

    return [books];
  }

  async findByGenre(genre: string): Promise<Book[]> {
    const books = this.books.find((book) => book.genres.includes(Genre[genre]));

    if (!books) {
      return [];
    }

    return [books];
  }

  async findByLanguage(language: Language): Promise<Book[]> {
    const books = this.books.find((book) => book.language === language);

    if (!books) {
      return [];
    }

    return [books];
  }

  async create(bookData: Book): Promise<void> {
    this.books.push(bookData);
  }

  async update(id: number, data: Book): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex >= 0) {
      this.books[bookIndex] = data;
    }
  }

  async delete(id: number): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex >= 0) {
      this.books.splice(bookIndex, 1);
    }
  }
}

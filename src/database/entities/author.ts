import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';
import { Book } from './book';

export interface IAuthorProps {
  name: string;
  books?: Book[];

  createdAt: Date;
  updatedAt: Date;
}

export class Author {
  private _id: string | undefined;
  private props: IAuthorProps;

  constructor(
    props: Replace<IAuthorProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  // Adiciona um livro ao autor
  public addBook(book: Book): void {
    // Evita duplicatas
    if (!this.props.books.find((b) => b.id === book.id)) {
      this.props.books.push(book);
      // Adiciona o autor ao livro, se ainda não estiver presente
      if (!book.authors.find((a) => a.id === this.id)) {
        book.addAuthor(this);
      }
    }
  }

  // Remove um livro do autor
  public removeBook(bookId: string): void {
    this.props.books = this.props.books.filter((book) => book.id !== bookId);
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get books(): Book[] {
    return this.props.books;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set name(name: string) {
    this.props.name = name;
  }
}

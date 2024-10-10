import { Replace } from '@helpers/Replace';
import { Author } from './author';

export interface IBookProps {
  title: string;
  slug: string;
  authors: Author[];

  createdAt: Date;
  updatedAt: Date;
}

export class Book {
  private _id: string | undefined;
  private props: IBookProps;

  constructor(
    props: Replace<
      IBookProps,
      {
        authors?: Author[];
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      authors: props.authors ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id;
  }

  // Adiciona um autor ao livro
  public addAuthor(author: Author): void {
    // Evita duplicatas
    if (!this.props.authors.find((a) => a.id === author.id)) {
      this.props.authors.push(author);
      // Adiciona o livro ao autor, se ainda não estiver presente
      if (!author.books.find((b) => b.id === this.id)) {
        author.addBook(this);
      }
    }
  }

  // Remove um autor do livro
  public removeAuthor(authorId: string): void {
    this.props.authors = this.props.authors.filter(
      (author) => author.id !== authorId,
    );
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public get authors(): Author[] {
    return this.props.authors;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

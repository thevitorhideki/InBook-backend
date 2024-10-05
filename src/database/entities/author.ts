import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';
import { Book } from './book';

export interface IAuthorProps {
  name: string;
  books: Book[];
}

export class Author {
  private _id: string | undefined;
  private props: IAuthorProps;

  constructor(props: Replace<IAuthorProps, { books?: Book[] }>, id?: string) {
    this.props = {
      ...props,
      books: props.books ?? [],
    };
    this._id = id ?? randomUUID();
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

  public set name(name: string) {
    this.props.name = name;
  }
}

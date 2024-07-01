import { Replace } from 'src/helpers/Replace';
import { Book } from './book';
import { User } from './user';

export interface IReviewProps {
  userId: number;
  bookId: number;
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarrator: boolean;
  title?: string;
  content?: string;
  user: User;
  book: Book;

  createdAt: Date;
  updatedAt: Date;
}

export class Review {
  private _id: number | undefined;
  private props: IReviewProps;

  constructor(
    props: Replace<
      IReviewProps,
      { user?: User; book?: Book; createdAt?: Date; updatedAt?: Date }
    >,
    id?: number,
  ) {
    this.props = {
      ...props,
      user: props.user ?? null,
      book: props.book ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    };
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public get bookId(): number {
    return this.props.bookId;
  }

  public get recommended(): boolean {
    return this.props.recommended;
  }

  public get enjoyedContent(): boolean {
    return this.props.enjoyedContent;
  }

  public get enjoyedNarrator(): boolean {
    return this.props.enjoyedNarrator;
  }

  public get title(): string | null | undefined {
    return this.props.title;
  }

  public get content(): string | null | undefined {
    return this.props.content;
  }

  public get user(): User {
    return this.props.user;
  }

  public get book(): Book {
    return this.props.book;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set title(value: string | null | undefined) {
    this.props.title = value;
  }

  public set content(value: string | null | undefined) {
    this.props.content = value;
  }
}

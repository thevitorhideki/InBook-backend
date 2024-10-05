import { Replace } from '@helpers/Replace';
import { Author } from './author';

export interface IBookProps {
  title: string;
  slug: string;
  authorId: string;
  author: Author;

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
        author?: Author;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      author: props.author ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id;
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

  public get authorId(): string {
    return this.props.authorId;
  }

  public get author(): Author {
    return this.props.author;
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

  public set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

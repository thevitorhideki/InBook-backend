import { Replace } from '@helpers/Replace';
import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Book } from './book';
import { Profile } from './profile';
import { Review } from './review';

export interface IUserProps {
  username: string;
  email: string;
  password: string;
  profile: Profile;
  reviews: Review[];
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string | undefined;
  private props: IUserProps;

  constructor(
    props: Replace<
      IUserProps,
      {
        password?: string;
        profile?: Profile;
        reviews?: Review[];
        books?: Book[];
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      password: props.password ? hashSync(props.password, 10) : null,
      profile: props.profile ?? null,
      reviews: props.reviews ?? [],
      books: props.books ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get username(): string {
    return this.props.username;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get profile(): Profile {
    return this.props.profile;
  }

  public get reviews(): Review[] {
    return this.props.reviews;
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

  public set username(value: string) {
    this.props.username = value;
  }

  public set email(value: string) {
    this.props.email = value;
  }

  public set password(value: string) {
    this.props.password = hashSync(value, 10);
  }
}

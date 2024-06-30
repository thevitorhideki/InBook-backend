import { Replace } from '@/helpers/Replace';
import { Book } from './book';
import { Profile } from './profile';
import { Review } from './review';
import { hashSync } from 'bcrypt';

export interface IUserProps {
  username: string;
  email: string;
  password: string;
  profile?: Profile;
  reviews?: Review[];
  books?: Book[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: number | undefined;
  private props: IUserProps;

  constructor(props: Replace<IUserProps, { createdAt?: Date }>, id?: number) {
    this.props = {
      ...props,
      password: hashSync(props.password, 10),
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id;
  }

  public get id(): number | undefined {
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

  public get updatedAt(): Date | null {
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

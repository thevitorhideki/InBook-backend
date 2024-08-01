import { Replace } from '@helpers/Replace';
import { Book } from './book';
import { Profile } from './profile';
import { Review } from './review';

export interface IUserProps {
  id: string;
  email: string;
  profile: Profile;
  reviews: Review[];
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: IUserProps;

  constructor(
    props: Replace<
      IUserProps,
      {
        profile?: Profile;
        reviews?: Review[];
        books?: Book[];
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
  ) {
    this.props = {
      ...props,
      profile: props.profile ?? null,
      reviews: props.reviews ?? [],
      books: props.books ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get email(): string {
    return this.props.email;
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

  public set email(value: string) {
    this.props.email = value;
  }
}

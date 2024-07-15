import { Replace } from '@helpers/Replace';
import { InteractionType } from '../enums/interaction';
import { Book } from './book';
import { User } from './user';

export interface IInteractionProps {
  userId: string;
  user: User;
  bookId: number;
  book: Book;
  type: InteractionType;
}

export class Interaction {
  private props: IInteractionProps;

  constructor(
    props: Replace<
      IInteractionProps,
      {
        user?: User;
        book?: Book;
      }
    >,
  ) {
    this.props = {
      ...props,
      user: props.user ?? null,
      book: props.book ?? null,
    };
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get user(): User {
    return this.props.user;
  }

  public get bookId(): number {
    return this.props.bookId;
  }

  public get book(): Book {
    return this.props.book;
  }

  public get type(): InteractionType {
    return this.props.type;
  }

  public set type(type: InteractionType) {
    this.props.type = type;
  }
}

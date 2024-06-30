import { InteractionType } from '../enums/interaction-type';
import { Book } from './book';
import { User } from './user';

export interface IUserBookInteractionProps {
  userId: number;
  user: User;
  bookId: number;
  book: Book;
  interactionType: InteractionType;
}

export class UserBookInteraction {
  private _id: number | undefined;
  private props: IUserBookInteractionProps;

  constructor(props: IUserBookInteractionProps, id?: number) {
    this.props = {
      ...props,
    };
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get userId(): number {
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

  public get interactionType(): InteractionType {
    return this.props.interactionType;
  }

  public set interactionType(interactionType: InteractionType) {
    this.props.interactionType = interactionType;
  }
}

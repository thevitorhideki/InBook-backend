import { InteractionType } from '@prisma/client';
export interface IUserBookInteractionProps {
  userId: number;
  bookId: number;
  interactionType: InteractionType;
}

export class UserBookInteraction {
  private _id: number;
  private props: IUserBookInteractionProps;

  constructor(props: IUserBookInteractionProps, id?: number) {
    this.props = {
      ...props,
    };
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public get bookId(): number {
    return this.props.bookId;
  }

  public get interactionType(): InteractionType {
    return this.props.interactionType;
  }

  public set interactionType(interactionType: InteractionType) {
    this.props.interactionType = interactionType;
  }
}

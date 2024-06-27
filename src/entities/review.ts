import { Replace } from 'src/helpers/Replace';

export interface IReviewProps {
  userId: number;
  bookId: number;
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarrator: boolean;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Review {
  private _id: number;
  private props: IReviewProps;

  constructor(props: Replace<IReviewProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get bookId(): number {
    return this.props.bookId;
  }

  get recommended(): boolean {
    return this.props.recommended;
  }

  get enjoyedContent(): boolean {
    return this.props.enjoyedContent;
  }

  get enjoyedNarrator(): boolean {
    return this.props.enjoyedNarrator;
  }
}

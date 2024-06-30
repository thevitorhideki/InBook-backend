import { User } from './user';

export interface IProfileProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  userId: number;
  user?: User;
}

export class Profile {
  private _id: number | undefined;
  private props: IProfileProps;

  constructor(props: IProfileProps, id?: number) {
    this.props = {
      ...props,
    };
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get avatarUrl(): string {
    return this.props.avatarUrl;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public get user(): User {
    return this.props.user;
  }

  public set firstName(value: string) {
    this.props.firstName = value;
  }

  public set lastName(value: string) {
    this.props.lastName = value;
  }

  public set avatarUrl(value: string) {
    this.props.avatarUrl = value;
  }
}

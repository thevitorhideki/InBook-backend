import { Replace } from '@helpers/Replace';
import { User } from './user';

export interface IProfileProps {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  user: User;
}

export class Profile {
  private props: IProfileProps;

  constructor(props: Replace<IProfileProps, { user?: User }>) {
    this.props = {
      ...props,
      user: props.user ?? null,
    };
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

  public get userId(): string {
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

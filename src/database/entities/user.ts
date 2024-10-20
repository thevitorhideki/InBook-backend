import { Replace } from '@helpers/Replace';
import { hashSync } from 'bcrypt';

export interface IUserProps {
  email: string;
  password: string;
  isAdmin: boolean;
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
        isAdmin?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      password: props.password ? hashSync(props.password, 10) : null,
      isAdmin: props.isAdmin ?? false,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get isAdmin(): boolean {
    return this.props.isAdmin;
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

  public set password(value: string) {
    this.props.password = hashSync(value, 10);
  }

  public set isAdmin(value: boolean) {
    this.props.isAdmin = value;
  }
}

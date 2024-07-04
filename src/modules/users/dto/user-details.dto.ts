import { User } from '@database/entities/user';

export class UserDetailsDto {
  username: string;
  email: string;

  public static fromEntity(user: User): UserDetailsDto {
    const { username, email } = user;

    return {
      username,
      email,
    };
  }
}

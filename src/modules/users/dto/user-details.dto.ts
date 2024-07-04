import { User } from '@database/entities/user';

export class UserDetailsDto {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;

  public static fromEntity(user: User): UserDetailsDto {
    return {
      username: user.username,
      email: user.email,
      firstName: user.profile.firstName || undefined,
      lastName: user.profile.lastName || undefined,
      avatarUrl: user.profile.avatarUrl || undefined,
    };
  }
}

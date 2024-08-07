import { User } from '@database/entities/user';

export class UserDetailsDto {
  id: string;
  email: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };

  public static fromEntity(user: User): UserDetailsDto {
    return {
      id: user.id,
      email: user.email,
      profile: {
        firstName: user.profile?.firstName || undefined,
        lastName: user.profile?.lastName || undefined,
        avatarUrl: user.profile?.avatarUrl || undefined,
      },
    };
  }
}

import { Profile } from '@database/entities/profile';
import { User } from '@database/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  static toEntity(userRaw: any): User {
    return new User(
      {
        username: userRaw.username,
        email: userRaw.email,
        profile: {
          firstName: userRaw.profile?.first_name || undefined,
          lastName: userRaw.profile?.last_name || undefined,
          avatarUrl: userRaw.profile?.avatar_url || undefined,
        } as Profile,
      },
      userRaw.id,
    );
  }
}

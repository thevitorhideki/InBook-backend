import { Profile } from '@database/entities/profile';
import { User } from '@database/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  static toEntity(userRaw: any): User {
    return new User({
      id: userRaw.id,
      username: userRaw.username,
      email: userRaw.email,
      profile: {
        firstName: userRaw.profile?.first_name || undefined,
        lastName: userRaw.profile?.last_name || undefined,
        avatarUrl: userRaw.profile?.avatar_url || undefined,
      } as Profile,
    });
  }
}

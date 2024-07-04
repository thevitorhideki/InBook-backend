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
        password: userRaw.password,
        profile: userRaw.profile as Profile,
      },
      userRaw.id,
    );
  }
}

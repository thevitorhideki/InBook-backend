import { User } from '@database/entities/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  static toEntity(userRaw: RawUser): User {
    return new User(
      {
        username: userRaw.username,
        email: userRaw.email,
        password: userRaw.password,
      },
      userRaw.id,
    );
  }
}

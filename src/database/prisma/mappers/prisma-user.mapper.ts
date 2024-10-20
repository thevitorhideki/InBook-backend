import { User } from '@database/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      email: user.email,
      password: user.password,
    };
  }

  static toEntity(userRaw: any): User {
    return new User(
      {
        email: userRaw.email,
        password: userRaw.password,
      },
      userRaw.id,
    );
  }
}

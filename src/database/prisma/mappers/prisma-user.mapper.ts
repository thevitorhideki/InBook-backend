import { User } from '@/database/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }
}

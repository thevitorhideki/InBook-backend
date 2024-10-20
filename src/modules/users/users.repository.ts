import { User } from '@database/entities/user';

export abstract class UsersRepository {
  abstract createUser(userData: User): Promise<User>;
  abstract findByEmail(email: string): Promise<any | undefined>;
  abstract findById(userId: string): Promise<any | undefined>;
}

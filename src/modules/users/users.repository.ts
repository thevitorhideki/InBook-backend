import { User } from '@database/entities/user';

export abstract class UsersRepository {
  abstract createUser(userData: User): Promise<User>;
  abstract findByUsername(username: string): Promise<any | undefined>;
  abstract findById(userId: number): Promise<any | undefined>;
}

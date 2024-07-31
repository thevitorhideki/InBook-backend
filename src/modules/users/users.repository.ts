import { User } from '@database/entities/user';

export abstract class UsersRepository {
  abstract createUser(userData: User): Promise<User>;
  abstract findByEmail(emailAddress: string): Promise<User>;
  abstract findById(userId: string): Promise<User>;
}

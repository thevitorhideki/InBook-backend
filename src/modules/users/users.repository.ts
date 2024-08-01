import { User } from '@database/entities/user';

export abstract class UsersRepository {
  abstract getAllUsers(): Promise<User[]>;
  abstract createUser(userData: User): Promise<void>;
  abstract findByEmail(emailAddress: string): Promise<User>;
}

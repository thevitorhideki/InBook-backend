import { User } from '@/database/entities/user';

export abstract class UsersRepository {
  abstract createUser(userData: User): Promise<any>;
}

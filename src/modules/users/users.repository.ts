import { User } from '@/database/entities/user';
import { UpdateUserDto } from './dto/update-user.dto';

export abstract class UsersRepository {
  abstract createUser(userData: User): Promise<User>;
  abstract findByUsername(username: string): Promise<any | undefined>;
  abstract updateUser(userId: number, userData: UpdateUserDto): Promise<any>;
}

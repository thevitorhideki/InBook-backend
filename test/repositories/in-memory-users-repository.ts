import { User } from '@database/entities/user';
import { UsersRepository } from '@modules/users/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(userData: User): Promise<void> {
    const emailAlreadyExits = await this.findByEmail(userData.email);
    const idAlreadyExists = await this.findById(userData.id);

    if (emailAlreadyExits || idAlreadyExists) {
      return;
    }

    this.users.push(userData);
  }

  async findByEmail(emailAddress: string): Promise<User> {
    const user = this.users.find((user) => user.email === emailAddress);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}

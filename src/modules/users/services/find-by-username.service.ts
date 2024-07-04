import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

interface IFindUserByUsernameRequest {
  username: string;
}

@Injectable()
export class FindUserByUsername {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: IFindUserByUsernameRequest): Promise<User> {
    const { username } = request;

    return await this.usersRepository.findByUsername(username);
  }
}

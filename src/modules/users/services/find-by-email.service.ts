import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

interface IFindUserByEmailRequest {
  email: string;
}

@Injectable()
export class FindUserByEmail {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: IFindUserByEmailRequest): Promise<User> {
    const { email } = request;

    return await this.usersRepository.findByEmail(email);
  }
}

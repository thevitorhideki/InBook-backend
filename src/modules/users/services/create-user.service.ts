import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../users.repository';

interface ICreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: CreateUserDto): Promise<ICreateUserResponse> {
    const user = new User(request);

    await this.usersRepository.createUser(user);

    return { user };
  }
}

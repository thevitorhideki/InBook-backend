import { User } from '@database/entities/user';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersRepository } from '@modules/users/users.repository';
import { Injectable } from '@nestjs/common';
import { Login } from './login.service';

@Injectable()
export class Register {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly login: Login,
  ) {}

  async execute(request: CreateUserDto) {
    const user = new User(request);

    const createdUser = await this.usersRepository.createUser(user);

    return await this.login.execute(createdUser);
  }
}

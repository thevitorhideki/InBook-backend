import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../users.repository';

interface ICreateUserResponse {
  userId: string;
}

@Injectable()
export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: CreateUserDto): Promise<ICreateUserResponse> {
    const { id, email } = request;

    const user = new User({
      id,
      email,
    });

    await this.usersRepository.createUser(user);

    return { userId: id };
  }
}

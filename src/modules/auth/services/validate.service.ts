import { UsersRepository } from '@/modules/users/users.repository';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

interface IValidateUserRequest {
  username: string;
  pass: string;
}

@Injectable()
export class ValidateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: IValidateUserRequest): Promise<any> {
    const { username, pass } = request;
    const userFound = await this.usersRepository.findByUsername(username);
    const passwordMatch = await compare(pass, userFound.password);

    if (userFound && passwordMatch) {
      const { password, ...result } = userFound;
      return result;
    }
    return null;
  }
}

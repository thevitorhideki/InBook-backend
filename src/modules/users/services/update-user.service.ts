import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../users.repository';

interface IUpdateUserRequest {
  userId: number;
  userData: UpdateUserDto;
}

@Injectable()
export class UpdateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: IUpdateUserRequest): Promise<any> {
    const { userId, userData } = request;

    if (userData.password) {
      userData.password = await hash(userData.password, 10);
    }

    return await this.usersRepository.updateUser(userId, userData);
  }
}

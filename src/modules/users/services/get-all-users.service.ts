import { Injectable } from '@nestjs/common';
import { UserDetailsDto } from '../dto/user-details.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class GetAllUsers {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<UserDetailsDto[]> {
    const users = await this.usersRepository.getAllUsers();

    return users.map(UserDetailsDto.fromEntity);
  }
}

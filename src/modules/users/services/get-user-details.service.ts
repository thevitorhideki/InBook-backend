import { Injectable } from '@nestjs/common';
import { UserDetailsDto } from '../dto/user-details.dto';
import { UsersRepository } from '../users.repository';

interface IFindByIdRequest {
  userId: string;
}

@Injectable()
export class GetUserDetails {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: IFindByIdRequest): Promise<UserDetailsDto> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    return UserDetailsDto.fromEntity(user);
  }
}

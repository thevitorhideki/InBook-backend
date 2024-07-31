import { Injectable } from '@nestjs/common';
import { UserDetailsDto } from '../dto/user-details.dto';
import { UsersRepository } from '../users.repository';

interface FindByEmailRequest {
  emailAddress: string;
}

@Injectable()
export class GetUserByEmail {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(request: FindByEmailRequest) {
    const { emailAddress } = request;

    const user = await this.usersRepository.findByEmail(emailAddress);

    return UserDetailsDto.fromEntity(user);
  }
}

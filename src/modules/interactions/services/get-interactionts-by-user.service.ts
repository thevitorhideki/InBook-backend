import { Injectable } from '@nestjs/common';
import { GetInteractionsByUserDto } from '../dto/get-interactions-by-user.dto';
import { InteractionsRepository } from '../interactions.repository';

@Injectable()
export class GetInteractionsByUser {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
  ) {}

  async execute(userId: string) {
    const interactions =
      await this.interactionsRepository.getInteractionsByUser(userId);

    return GetInteractionsByUserDto.fromEntity(interactions);
  }
}

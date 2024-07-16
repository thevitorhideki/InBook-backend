import { Injectable } from '@nestjs/common';
import { InteractionsRepository } from '../interactions.repository';

@Injectable()
export class GetInteractionsByUserAndBook {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
  ) {}

  async execute(bookId: number, userId: string) {
    const interactions =
      await this.interactionsRepository.getInteractionsByUserAndBook(
        bookId,
        userId,
      );

    return interactions;
  }
}

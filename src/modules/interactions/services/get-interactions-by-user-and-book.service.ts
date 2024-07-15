import { Injectable } from '@nestjs/common';
import { GetInteractionsByUserAndBookDto } from '../dto/get-interactions-by-user-and-book.dto';
import { InteractionsRepository } from '../interactions.repository';

@Injectable()
export class GetInteractionsByUserAndBook {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
  ) {}

  async execute(
    bookId: number,
    userId: string,
  ): Promise<GetInteractionsByUserAndBookDto> {
    const interactions =
      await this.interactionsRepository.getInteractionsByUserAndBook(
        bookId,
        userId,
      );

    return GetInteractionsByUserAndBookDto.fromEntity(interactions);
  }
}

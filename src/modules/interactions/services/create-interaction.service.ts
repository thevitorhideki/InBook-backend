import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';
import { Injectable } from '@nestjs/common';
import { InteractionsRepository } from '../interactions.repository';

interface ICreateInteractionRequest {
  userId: string;
  bookId: number;
  type: InteractionType;
}

@Injectable()
export class CreateInteraction {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
  ) {}

  async execute(request: ICreateInteractionRequest): Promise<void> {
    const { userId, bookId, type } = request;

    const interaction = new Interaction({ userId, bookId, type });

    await this.interactionsRepository.createInteraction(interaction);
  }
}

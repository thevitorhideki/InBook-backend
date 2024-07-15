import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';
import { Injectable } from '@nestjs/common';
import { InteractionsRepository } from '../interactions.repository';

interface IRemoveInteractionRequest {
  userId: string;
  bookId: number;
  type: InteractionType;
}

@Injectable()
export class RemoveInteraction {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
  ) {}

  async execute(request: IRemoveInteractionRequest) {
    const { userId, bookId, type } = request;

    const interaction = new Interaction({ userId, bookId, type });

    await this.interactionsRepository.removeInteraction(interaction);
  }
}

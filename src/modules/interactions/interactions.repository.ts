import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';

export abstract class InteractionsRepository {
  abstract createInteraction(interaction: Interaction): Promise<void>;
  abstract removeInteraction(interaction: Interaction): Promise<void>;
  abstract getInteractionsByUserAndBook(
    bookId: number,
    userId: string,
  ): Promise<InteractionType[]>;
  abstract getInteractionsByUser(userId: string): Promise<Interaction[]>;
}

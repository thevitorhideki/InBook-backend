import { Interaction } from '@database/entities/interaction';

export abstract class InteractionsRepository {
  abstract createInteraction(interaction: Interaction): Promise<void>;
  abstract removeInteraction(interaction: Interaction): Promise<void>;
  abstract getInteractionsByUserAndBook(
    bookId: number,
    userId: string,
  ): Promise<Interaction[]>;
  abstract getInteractionsByUser(userId: string): Promise<Interaction[]>;
}

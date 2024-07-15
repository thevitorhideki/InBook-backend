import { Interaction } from '@database/entities/interaction';

export abstract class InteractionsRepository {
  abstract createInteraction(interaction: Interaction): Promise<void>;
  abstract removeInteraction(interaction: Interaction): Promise<void>;
}

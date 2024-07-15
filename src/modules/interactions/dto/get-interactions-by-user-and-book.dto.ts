import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';

export class GetInteractionsByUserAndBookDto {
  interactions: InteractionType[];

  static fromEntity(
    interactions: Interaction[],
  ): GetInteractionsByUserAndBookDto {
    return {
      interactions: interactions.map((interaction) => interaction.type),
    };
  }
}

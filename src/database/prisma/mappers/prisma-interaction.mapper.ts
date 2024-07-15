import { Interaction } from '@database/entities/interaction';

export class PrismaInteractionMapper {
  static toPrisma(interaction: Interaction) {
    return {
      user_id: interaction.userId,
      book_id: interaction.bookId,
      interaction_type: interaction.type,
    };
  }
}

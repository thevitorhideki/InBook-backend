import { Interaction } from '@database/entities/interaction';

export class PrismaInteractionMapper {
  static toPrisma(interaction: Interaction) {
    return {
      user_id: interaction.userId,
      book_id: interaction.bookId,
      interaction_type: interaction.type,
    };
  }

  static toEntity(raw: any): Interaction {
    return new Interaction({
      userId: raw.user_id,
      bookId: raw.book_id,
      type: raw.interaction_type,
    });
  }
}

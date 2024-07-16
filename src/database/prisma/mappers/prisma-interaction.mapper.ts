import { Book } from '@database/entities/book';
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
      book: {
        id: raw.book.id,
        title: raw.book.title,
        coverImageUrl: raw.book.cover_image_url,
        duration: raw.book.duration,
        pages: raw.book.pages,
        author: {
          name: raw.book.author.name,
        },
      } as Book,
    });
  }
}

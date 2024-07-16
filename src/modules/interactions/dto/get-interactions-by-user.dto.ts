import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';

interface BookDetails {
  id: number;
  title: string;
  author: {
    name: string;
  };
  pages: number;
  duration: number;
  coverImageUrl?: string;
}

export class GetInteractionsByUserDto {
  SAVED: {
    books: BookDetails[];
  };
  DOWNLOADED: {
    books: BookDetails[];
  };
  READ: {
    books: BookDetails[];
  };
  READING: {
    books: BookDetails[];
  };

  static fromEntity(interactions: Interaction[]): GetInteractionsByUserDto {
    return {
      SAVED: {
        books: interactions
          .filter((i) => i.type === InteractionType.SAVED)
          .map((i) => ({
            id: i.book.id,
            title: i.book.title,
            coverImageUrl: i.book.coverImageUrl,
            pages: i.book.pages,
            duration: i.book.duration,
            author: {
              name: i.book.author.name,
            },
          })),
      },
      DOWNLOADED: {
        books: interactions
          .filter((i) => i.type === InteractionType.DOWNLOADED)
          .map((i) => ({
            id: i.book.id,
            title: i.book.title,
            coverImageUrl: i.book.coverImageUrl,
            pages: i.book.pages,
            duration: i.book.duration,
            author: {
              name: i.book.author.name,
            },
          })),
      },
      READ: {
        books: interactions
          .filter((i) => i.type === InteractionType.READ)
          .map((i) => ({
            id: i.book.id,
            title: i.book.title,
            coverImageUrl: i.book.coverImageUrl,
            pages: i.book.pages,
            duration: i.book.duration,
            author: {
              name: i.book.author.name,
            },
          })),
      },
      READING: {
        books: interactions
          .filter((i) => i.type === InteractionType.READING)
          .map((i) => ({
            id: i.book.id,
            title: i.book.title,
            coverImageUrl: i.book.coverImageUrl,
            pages: i.book.pages,
            duration: i.book.duration,
            author: {
              name: i.book.author.name,
            },
          })),
      },
    };
  }
}

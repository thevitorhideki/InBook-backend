import { Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';
import { InteractionsRepository } from '@modules/interactions/interactions.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaInteractionMapper } from '../mappers/prisma-interaction.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaInteractionsRepository implements InteractionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getInteractionsByUser(userId: string): Promise<Interaction[]> {
    try {
      const interactions = await this.prisma.interaction.findMany({
        where: {
          user_id: userId,
        },
        select: {
          interaction_type: true,
          book: {
            select: {
              id: true,
              title: true,
              cover_image_url: true,
              duration: true,
              pages: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return interactions.map(PrismaInteractionMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async getInteractionsByUserAndBook(
    bookId: number,
    userId: string,
  ): Promise<InteractionType[]> {
    const interactions = await this.prisma.interaction.findMany({
      where: {
        book_id: bookId,
        user_id: userId,
      },
      select: {
        interaction_type: true,
      },
    });

    return interactions.map((i) => InteractionType[i.interaction_type]);
  }

  async createInteraction(interaction: Interaction): Promise<void> {
    try {
      const raw = PrismaInteractionMapper.toPrisma(interaction);

      await this.prisma.interaction.create({
        data: raw,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new NotFoundException(
          'The user has already interacted with this book in this way',
        );
      } else if (error.code === 'P2003') {
        throw new NotFoundException('Book not found');
      }
      console.error(error);
      throw error;
    }
  }

  async removeInteraction(interaction: Interaction): Promise<void> {
    try {
      const raw = PrismaInteractionMapper.toPrisma(interaction);

      await this.prisma.interaction.delete({
        where: {
          user_id_book_id_interaction_type: {
            user_id: raw.user_id,
            book_id: raw.book_id,
            interaction_type: raw.interaction_type,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Interaction not found');
      }
      throw error;
    }
  }
}

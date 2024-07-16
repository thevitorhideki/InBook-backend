import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { CreateInteraction } from './services/create-interaction.service';
import { GetInteractionsByUserAndBook } from './services/get-interactions-by-user-and-book.service';
import { GetInteractionsByUser } from './services/get-interactionts-by-user.service';
import { RemoveInteraction } from './services/remove-interaction.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateInteraction,
    RemoveInteraction,
    GetInteractionsByUserAndBook,
    GetInteractionsByUser,
  ],
  controllers: [InteractionsController],
})
export class InteractionsModule {}

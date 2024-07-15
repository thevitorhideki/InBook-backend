import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { CreateInteraction } from './services/create-interaction.service';
import { GetInteractionsByUserAndBook } from './services/get-interactions-by-user-and-book.service';
import { RemoveInteraction } from './services/remove-interaction.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateInteraction,
    RemoveInteraction,
    GetInteractionsByUserAndBook,
  ],
  controllers: [InteractionsController],
})
export class InteractionsModule {}

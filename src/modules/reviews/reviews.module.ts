import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { CreateReview } from './services/create-review.service';

@Module({
  imports: [DatabaseModule],
  providers: [CreateReview],
  controllers: [ReviewsController],
})
export class ReviewsModule {}

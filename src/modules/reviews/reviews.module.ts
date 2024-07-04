import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { CreateReview } from './services/create-review.service';
import { GetBookReviews } from './services/get-book-reviews.service';

@Module({
  imports: [DatabaseModule],
  providers: [GetBookReviews, CreateReview],
  controllers: [ReviewsController],
})
export class ReviewsModule {}

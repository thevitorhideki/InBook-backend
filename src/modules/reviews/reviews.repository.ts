import { Review } from '@/database/entities/review';

export abstract class ReviewsRepository {
  abstract createReview(reviewData: Review): Promise<void>;
}

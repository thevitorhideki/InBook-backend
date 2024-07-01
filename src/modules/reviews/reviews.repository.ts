import { Review } from '@/database/entities/review';

export abstract class ReviewsRepository {
  abstract getBookReviews(bookId: number): Promise<Review[]>;
  abstract createReview(reviewData: Review): Promise<void>;
}

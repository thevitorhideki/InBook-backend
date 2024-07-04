import { Review } from '@database/entities/review';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewsRepository } from '../reviews.repository';

interface ICreateReviewRequest {
  bookId: number;
  userId: number;
  reviewData: CreateReviewDto;
}

@Injectable()
export class CreateReview {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(request: ICreateReviewRequest): Promise<void> {
    const { bookId, userId, reviewData } = request;

    const review = new Review({
      ...reviewData,
      userId,
      bookId,
    });

    await this.reviewsRepository.createReview(review);
  }
}

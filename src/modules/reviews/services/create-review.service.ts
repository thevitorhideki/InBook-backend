import { Review } from '@/database/entities/review';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewsRepository } from '../reviews.repository';

interface ICreateReviewRequest {
  bookId: number;
  reviewData: CreateReviewDto;
}

interface ICreateReviewResponse {
  review: Review;
}

@Injectable()
export class CreateReview {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(request: ICreateReviewRequest): Promise<ICreateReviewResponse> {
    const { bookId, reviewData } = request;

    const review = new Review({
      ...reviewData,
      bookId,
    });

    await this.reviewsRepository.createReview(review);

    return { review };
  }
}

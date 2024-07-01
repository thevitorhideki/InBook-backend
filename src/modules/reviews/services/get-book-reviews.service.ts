import { Injectable } from '@nestjs/common';
import { ReviewDetailsDto } from '../dto/review-details.dto';
import { ReviewsRepository } from '../reviews.repository';

interface IGetBookReviews {
  bookId: number;
}

@Injectable()
export class GetBookReviews {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute(request: IGetBookReviews): Promise<ReviewDetailsDto[]> {
    const { bookId } = request;

    const reviews = await this.reviewsRepository.getBookReviews(bookId);

    return reviews.map(ReviewDetailsDto.fromEntity);
  }
}

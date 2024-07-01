import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDetailsDto } from './dto/review-details.dto';
import { CreateReview } from './services/create-review.service';
import { GetBookReviews } from './services/get-book-reviews.service';

@ApiTags('Reviews')
@Controller()
export class ReviewsController {
  constructor(
    private readonly createReview: CreateReview,
    private readonly getBookReviews: GetBookReviews,
  ) {}

  @Get()
  async getReviews(@Param('id') id: string): Promise<ReviewDetailsDto[]> {
    return this.getBookReviews.execute({ bookId: parseInt(id) });
  }

  @Post()
  async create(
    @Param('id') id: string,
    @Body() body: CreateReviewDto,
  ): Promise<void> {
    await this.createReview.execute({
      bookId: parseInt(id),
      reviewData: body,
    });
  }
}

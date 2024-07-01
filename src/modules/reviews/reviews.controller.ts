import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get reviews by book ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  async getReviews(@Param('id') id: string): Promise<ReviewDetailsDto[]> {
    return this.getBookReviews.execute({ bookId: parseInt(id) });
  }

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'The request body is invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'The book or user was not found',
  })
  @ApiResponse({
    status: 409,
    description: 'The user already reviewed this book',
  })
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

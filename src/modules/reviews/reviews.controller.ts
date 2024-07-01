import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReview } from './services/create-review.service';

@ApiTags('Reviews')
@Controller()
export class ReviewsController {
  constructor(private readonly createReview: CreateReview) {}

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

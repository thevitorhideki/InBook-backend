import { Review } from '@/database/entities/review';
import { ReviewsRepository } from '@/modules/reviews/reviews.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaReviewMapper } from '../mappers/prisma.review.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaReviewsRepository implements ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBookReviews(bookId: number): Promise<Review[]> {
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const reviews = await this.prisma.review.findMany({
      where: { bookId },
      include: {
        user: {
          select: {
            username: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    console.log(reviews);

    return reviews.map(PrismaReviewMapper.toEntity);
  }

  async createReview(reviewData: Review): Promise<void> {
    const book = await this.prisma.book.findUnique({
      where: { id: reviewData.bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: reviewData.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const raw = PrismaReviewMapper.toPrisma(reviewData);

    try {
      await this.prisma.review.create({
        data: raw,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'You have already reviewed this book',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}

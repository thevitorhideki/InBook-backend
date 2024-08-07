import { Review } from '@database/entities/review';
import { ReviewsRepository } from '@modules/reviews/reviews.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaReviewMapper } from '../mappers/prisma.review.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaReviewsRepository implements ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBookReviews(bookId: number): Promise<Review[]> {
    try {
      await this.prisma.book.findUniqueOrThrow({ where: { id: bookId } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found');
      }
    }

    const reviews = await this.prisma.review.findMany({
      where: { book_id: bookId },
      include: {
        user: {
          select: {
            id: true,
            profile: {
              select: {
                first_name: true,
                last_name: true,
                avatar_url: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return reviews.map(PrismaReviewMapper.toEntity);
  }

  async createReview(reviewData: Review): Promise<void> {
    const raw = PrismaReviewMapper.toPrisma(reviewData);

    try {
      await this.prisma.review.create({
        data: {
          user_id: raw.user_id,
          book_id: raw.book_id,
          recommended: raw.recommended,
          enjoyed_content: raw.enjoyed_content,
          enjoyed_narration: raw.enjoyed_narration,
          title: raw.title,
          content: raw.content,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('You have already reviewed this book');
      } else if (
        error.code === 'P2003' &&
        error.meta?.field_name?.includes('userId')
      ) {
        throw new NotFoundException('User not found');
      } else if (
        error.code === 'P2003' &&
        error.meta?.field_name?.includes('bookId')
      ) {
        throw new NotFoundException('Book not found');
      }

      throw error;
    }
  }
}

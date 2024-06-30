import { Review } from '@/database/entities/review';

export class PrismaReviewMapper {
  static toPrisma(review: Review) {
    return {
      userId: review.userId,
      bookId: review.bookId,
      recommended: review.recommended,
      enjoyedContent: review.enjoyedContent,
      enjoyedNarrator: review.enjoyedNarrator,
      title: review.title,
      content: review.content,
    };
  }
}

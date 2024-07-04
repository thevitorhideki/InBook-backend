import { Book } from '@database/entities/book';
import { Review } from '@database/entities/review';
import { User } from '@database/entities/user';

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

  static toEntity(review: any): Review {
    return new Review(
      {
        userId: review.userId,
        bookId: review.bookId,
        recommended: review.recommended,
        enjoyedContent: review.enjoyedContent,
        enjoyedNarrator: review.enjoyedNarrator,
        title: review.title,
        content: review.content,
        book: review.book as Book,
        user: review.user as User,
      },
      review.id,
    );
  }
}

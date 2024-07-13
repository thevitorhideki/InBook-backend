import { Book } from '@database/entities/book';
import { Review } from '@database/entities/review';
import { User } from '@database/entities/user';

export class PrismaReviewMapper {
  static toPrisma(review: Review) {
    return {
      user_id: review.userId,
      book_id: review.bookId,
      recommended: review.recommended,
      enjoyed_content: review.enjoyedContent,
      enjoyed_narration: review.enjoyedNarration,
      title: review.title,
      content: review.content,
    };
  }

  static toEntity(review: any): Review {
    return new Review(
      {
        userId: review.user_id,
        bookId: review.book_id,
        recommended: review.recommended,
        enjoyedContent: review.enjoyed_content,
        enjoyedNarration: review.enjoyed_narration,
        title: review.title,
        content: review.content,
        book: review.book as Book,
        user: {
          id: review.user.id,
          username: review.user.username,
          profile: {
            avatarUrl: review.user.profile.avatar_url,
          },
        } as User,
      },
      review.id,
    );
  }
}

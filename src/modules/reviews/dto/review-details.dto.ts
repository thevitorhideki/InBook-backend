import { Review } from '@database/entities/review';

export class ReviewDetailsDto {
  reviewId: number;
  recommended: boolean;
  enjoyedContent: boolean;
  enjoyedNarration: boolean;
  title?: string;
  content?: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };

  static fromEntity(review: Review): ReviewDetailsDto {
    return {
      reviewId: review.id,
      recommended: review.recommended,
      enjoyedContent: review.enjoyedContent,
      enjoyedNarration: review.enjoyedNarration,
      title: review.title,
      content: review.content,
      user: {
        id: review.user.id,
        username: review.user.username,
        avatarUrl: review.user.profile.avatarUrl,
      },
    };
  }
}

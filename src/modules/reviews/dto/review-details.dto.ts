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
    firstName: string;
    lastName: string;
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
        firstName: review.user.profile.firstName,
        lastName: review.user.profile.lastName,
        avatarUrl: review.user.profile.avatarUrl,
      },
    };
  }
}

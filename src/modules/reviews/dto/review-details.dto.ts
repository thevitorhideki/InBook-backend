import { Review } from '@database/entities/review';

export class ReviewDetailsDto {
  recommended: boolean;
  title?: string;
  content?: string;
  user: {
    username: string;
    avatarUrl?: string;
  };

  static fromEntity(review: Review): ReviewDetailsDto {
    return {
      recommended: review.recommended,
      title: review.title,
      content: review.content,
      user: {
        username: review.user.username,
        avatarUrl: review.user.profile.avatarUrl,
      },
    };
  }
}

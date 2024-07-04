import { IReviewProps, Review } from '@database/entities/review';

type Override = Partial<IReviewProps>;

export function makeReview(override: Override = {}) {
  return new Review({
    userId: 9999,
    bookId: 9999,
    recommended: true,
    enjoyedContent: true,
    enjoyedNarrator: true,
    title: 'Great Book!',
    content: 'I really enjoyed reading this book. Highly recommended!',
    ...override,
  });
}

import { randomUUID } from 'crypto';
import { Review } from './review';

describe('Review', () => {
  it('should be able to create a new Review', () => {
    const review = new Review({
      userId: randomUUID(),
      bookId: 1,
      recommended: true,
      enjoyedContent: true,
      enjoyedNarration: true,
      title: 'Excellent Read!',
      content: 'This book is a masterpiece. The narration was top-notch.',
    });

    expect(review).toBeInstanceOf(Review);
  });
});

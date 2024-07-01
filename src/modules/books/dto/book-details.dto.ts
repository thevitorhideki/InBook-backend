import { Book } from '@/database/entities/book';
import { Review } from '@/database/entities/review';
import { Genre } from '@/database/enums/genre';
import { Language } from '@/database/enums/language';
import { ReviewDetailsDto } from '@/modules/reviews/dto/review-details.dto';

export class BookDetailsDto {
  title: string;
  description: string;
  genres: Genre[];
  language: Language;
  pages: number;
  duration: number;
  publicationYear?: number;
  coverImageUrl?: string;
  ebookFileUrl?: string;
  audiobookFileUrl?: string;
  author: {
    authorId: number;
    name: string;
    avatarUrl: string;
    about: string;
  };
  reviews: ReviewDetailsDto[];
  reviewsCount: number;

  static fromEntity(entity: Book): BookDetailsDto {
    const {
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      ebookFileUrl,
      audiobookFileUrl,
      author,
      reviews,
    } = entity;

    return {
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      ebookFileUrl,
      audiobookFileUrl,
      author: {
        authorId: author.id,
        name: author.name,
        avatarUrl: author.avatarUrl,
        about: author.about,
      },
      reviews: reviews.map((review: Review) => ({
        recommended: review.recommended,
        enjoyedContent: review.enjoyedContent,
        enjoyedNarrator: review.enjoyedNarrator,
        title: review.title,
        content: review.content,
        user: {
          username: review.user.username,
          avatarUrl: review.user.profile.avatarUrl,
        },
      })),
      reviewsCount: reviews.length,
    };
  }
}

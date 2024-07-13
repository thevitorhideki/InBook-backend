import { Book } from '@database/entities/book';
import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { ReviewDetailsDto } from '@modules/reviews/dto/review-details.dto';

export class BookDetailsDto {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  language: Language;
  pages: number;
  duration: number;
  publicationYear: number;
  coverImageUrl?: string;
  author: {
    authorId: string;
    name: string;
    about: string;
    avatarUrl: string;
    books: Book[];
  };
  reviews: ReviewDetailsDto[];

  static fromEntity(entity: Book): BookDetailsDto {
    const {
      id,
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      author,
      reviews,
    } = entity;

    return {
      id,
      title,
      description,
      genres,
      language,
      pages,
      duration,
      publicationYear,
      coverImageUrl,
      author: {
        authorId: author.id,
        name: author.name,
        avatarUrl: author.avatarUrl,
        about: author.about,
        books: author.books,
      },
      reviews: reviews.map((review) => ({
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
      })),
    };
  }
}

import { Author } from '@database/entities/author';
import { Book } from '@database/entities/book';
import { Interaction } from '@database/entities/interaction';
import { Review } from '@database/entities/review';
import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';

export class PrismaBookMapper {
  static toPrisma(book: Book) {
    return {
      title: book.title,
      description: book.description,
      genres: book.genres,
      language: book.language,
      pages: book.pages,
      duration: book.duration,
      publication_year: book.publicationYear,
      cover_image_url: book.coverImageUrl,
      ebook_file_url: book.ebookFileUrl,
      audiobook_file_url: book.audiobookFileUrl,
      author_id: book.authorId,
    };
  }

  static toEntity(raw: any): Book {
    return new Book(
      {
        title: raw.title,
        description: raw.description,
        genres: raw.genres as Genre[],
        language: raw.language as Language,
        pages: raw.pages,
        duration: raw.duration,
        publicationYear: raw.publication_year,
        coverImageUrl: raw.cover_image_url,
        ebookFileUrl: raw.ebook_file_url,
        audiobookFileUrl: raw.audiobook_file_url,
        authorId: raw.author_id,
        author: {
          id: raw.author.id,
          name: raw.author.name,
          about: raw.author.about,
          avatarUrl: raw.author.avatar_url,
          books: raw.author.books?.map((book) => {
            return {
              id: book.id,
              title: book.title,
              coverImageUrl: book.cover_image_url,
            } as Book;
          }),
        } as Author,
        reviews: raw.reviews?.map((review) => {
          return {
            id: review.id,
            title: review.title,
            content: review.content,
            recommended: review.recommended,
            enjoyedContent: review.enjoyed_content,
            enjoyedNarration: review.enjoyed_narration,
            user: {
              id: review.user.id,
              username: review.user.username,
              profile: {
                avatarUrl: review.user.profile.avatar_url,
              },
            },
          } as Review;
        }),
        interactions: raw.interactions as Interaction[],
      },
      raw.id,
    );
  }
}

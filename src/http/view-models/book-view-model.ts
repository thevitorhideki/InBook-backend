import { Book } from '@/entities/book';

export class BookViewModel {
  static toHTTP(book: Book) {
    return {
      title: book.title,
      description: book.description,
      genres: book.genres,
      language: book.language,
      pages: book.pages,
      duration: book.duration,
      publicationYear: book.publicationYear,
      coverImageUrl: book.coverImageUrl,
      ebookFileUrl: book.ebookFileUrl,
      audiobookFileUrl: book.audiobookFileUrl,
      authorId: book.authorId,
      reviews: book.reviews,
      interactions: book.interactions,
      createdAt: book.createdAt,
    };
  }
}

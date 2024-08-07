import { Genre } from '@database/enums/genre';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookCollectionDto } from '../dto/book-collection.dto';

interface IGetBooksByGenreRequest {
  genre: Genre;
  limit?: number;
}

@Injectable()
export class GetBooksByGenre {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IGetBooksByGenreRequest): Promise<BookCollectionDto> {
    const { genre, limit } = request;

    const books = await this.booksRepository.getBooksByGenre(genre, limit);

    return BookCollectionDto.fromEntity(books);
  }
}

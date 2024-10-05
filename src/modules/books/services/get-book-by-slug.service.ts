import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../books.repository';
import { BookDetailsDto } from '../dto/book-details.dto';

interface IGetBookBySlugRequest {
  slug: string;
}

@Injectable()
export class GetBookBySlug {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: IGetBookBySlugRequest): Promise<BookDetailsDto> {
    const { slug } = request;

    const book = await this.booksRepository.getBookBySlug(slug);

    return BookDetailsDto.fromEntity(book);
  }
}

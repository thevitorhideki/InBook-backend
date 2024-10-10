import { Book } from '@database/entities/book';
import { AuthorsRepository } from '@modules/authors/authors.repository';
import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/utils/generate-slug';
import { BooksRepository } from '../books.repository';
import { CreateBookDto } from '../dto/create-book.dto';

interface CreateBookResponse {
  bookId: string;
}

@Injectable()
export class CreateBook {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  async execute(request: CreateBookDto): Promise<CreateBookResponse> {
    const { title, authorIds } = request;
    const slug = generateSlug(title);

    const book = new Book({
      title,
      slug,
    });

    for (const id of authorIds) {
      const author = await this.authorsRepository.getAuthorById(id);
      book.addAuthor(author);
    }

    const bookId = await this.booksRepository.createBook(book);

    return { bookId };
  }
}

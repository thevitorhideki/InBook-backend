import { Book } from '@database/entities/book';
import { AuthorsRepository } from '@modules/authors/authors.repository';
import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/utils/generate-slug';
import { BooksRepository } from '../books.repository';
import { UpdateBookDto } from '../dto/update-book.dto';

interface IUpdateBookRequest {
  bookId: string;
  bookData: UpdateBookDto;
}

type IUpdateBookResponse = void;

@Injectable()
export class UpdateBook {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  async execute(request: IUpdateBookRequest): Promise<IUpdateBookResponse> {
    const { bookId, bookData } = request;

    const bookToUpdate = await this.booksRepository.getBookById(bookId);

    const newBook = new Book({
      ...bookToUpdate,
      title: bookToUpdate.title,
      slug: bookToUpdate.slug,
    });

    if (bookData.title && bookData.title !== bookToUpdate.title) {
      newBook.title = bookData.title;
      newBook.slug = generateSlug(bookData.title);
    }

    if (bookData.authorIds) {
      const authors = await Promise.all(
        bookData.authorIds.map((id) =>
          this.authorsRepository.getAuthorById(id),
        ),
      );

      for (const author of authors) {
        newBook.addAuthor(author);
      }
    }

    await this.booksRepository.updateBook(bookId, newBook);
  }
}

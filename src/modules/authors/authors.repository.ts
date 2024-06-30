import { Author } from '@/database/entities/author';
import { UpdateAuthorDto } from './dto/update-author.dto';

export abstract class AuthorsRepository {
  abstract createAuthor(authorData: Author): Promise<void>;
  abstract getAuthorById(authorId: number): Promise<any>;
  abstract updateAuthor(
    authorId: number,
    authorData: UpdateAuthorDto,
  ): Promise<void>;
  abstract deleteAuthor(authorId: number): Promise<void>;
}

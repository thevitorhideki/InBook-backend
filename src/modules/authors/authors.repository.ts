import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

export abstract class AuthorsRepository {
  abstract createAuthor(authorData: CreateAuthorDto): Promise<void>;
  abstract getAuthorById(authorId: number): Promise<any>;
  abstract updateAuthor(
    authorId: number,
    authorData: UpdateAuthorDto,
  ): Promise<void>;
  abstract deleteAuthor(authorId: number): Promise<void>;
}

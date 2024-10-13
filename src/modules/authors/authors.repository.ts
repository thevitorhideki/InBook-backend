import { Author } from '@database/entities/author';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

export abstract class AuthorsRepository {
  abstract createAuthor(authorData: CreateAuthorDto): Promise<string>;
  abstract getAuthors(): Promise<Author[]>;
  abstract getAuthorById(authorId: string): Promise<any>;
  abstract getAuthorsByName(name: string): Promise<any>;
  abstract updateAuthor(
    authorId: string,
    authorData: UpdateAuthorDto,
  ): Promise<void>;
  abstract deleteAuthor(authorId: string): Promise<void>;
}

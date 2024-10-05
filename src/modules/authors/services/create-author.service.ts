import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';

export type CreateAuthorResponse = {
  authorId: string;
};

@Injectable()
export class CreateAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(request: CreateAuthorDto): Promise<CreateAuthorResponse> {
    const authorId = await this.authorsRepository.createAuthor(request);

    return { authorId };
  }
}

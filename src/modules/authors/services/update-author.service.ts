import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';
import { UpdateAuthorDto } from '../dto/update-author.dto';

interface IUpdateAuthorRequest {
  authorId: string;
  authorData: UpdateAuthorDto;
}

@Injectable()
export class UpdateAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(request: IUpdateAuthorRequest): Promise<void> {
    const { authorId, authorData } = request;

    await this.authorsRepository.updateAuthor(authorId, authorData);
  }
}

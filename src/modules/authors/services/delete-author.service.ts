import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';

interface IGetAuthorByIdRequest {
  authorId: number;
}

type IGetAuthorByIdResponse = void;

@Injectable()
export class DeleteAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(
    request: IGetAuthorByIdRequest,
  ): Promise<IGetAuthorByIdResponse> {
    const { authorId } = request;

    await this.authorsRepository.deleteAuthor(authorId);
  }
}

import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';

interface IGetAuthorByIdRequest {
  authorId: string;
}

type IGetAuthorByIdResponse = any;

@Injectable()
export class GetAuthorById {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(
    request: IGetAuthorByIdRequest,
  ): Promise<IGetAuthorByIdResponse> {
    const { authorId } = request;

    const author = await this.authorsRepository.getAuthorById(authorId);

    return author;
  }
}

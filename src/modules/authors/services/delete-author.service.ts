import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from '../authors-repository';

interface IGetAuthorByIdRequest {
  authorId: number;
}

type IGetAuthorByIdResponse = void;

@Injectable()
export class DeleteAuthor {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(
    request: IGetAuthorByIdRequest,
  ): Promise<IGetAuthorByIdResponse> {
    const { authorId } = request;

    const authorExists = await this.authorsRepository.getAuthorById(authorId);

    if (!authorExists) {
      throw new NotFoundException('Author not found');
    }

    await this.authorsRepository.deleteAuthor(authorId);
  }
}

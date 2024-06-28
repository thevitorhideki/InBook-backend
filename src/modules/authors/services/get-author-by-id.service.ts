import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from '../authors-repository';
import { Author } from '@/entities/author';

interface IGetAuthorByIdRequest {
  authorId: number;
}

type IGetAuthorByIdResponse = Author;

@Injectable()
export class GetAuthorById {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(
    request: IGetAuthorByIdRequest,
  ): Promise<IGetAuthorByIdResponse> {
    const { authorId } = request;

    const author = await this.authorsRepository.getAuthorById(authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }
}

import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';

interface GetAuthorsByNameRequest {
  name: string;
}

interface GetAuthorsByNameResponse {
  id: string;
  name: string;
}

@Injectable()
export class GetAuthorsByName {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(
    request: GetAuthorsByNameRequest,
  ): Promise<GetAuthorsByNameResponse> {
    const { name } = request;

    const authors = await this.authorsRepository.getAuthorsByName(name);

    return authors;
  }
}
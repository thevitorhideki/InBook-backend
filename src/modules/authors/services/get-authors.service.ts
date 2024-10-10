import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';
import { AuthorDetailsDto } from '../dto/author-details';

@Injectable()
export class GetAuthors {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(): Promise<AuthorDetailsDto> {
    const authors = await this.authorsRepository.getAuthors();

    return AuthorDetailsDto.fromEntity(authors);
  }
}

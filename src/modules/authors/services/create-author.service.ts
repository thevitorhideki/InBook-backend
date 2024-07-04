import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';

@Injectable()
export class CreateAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(request: CreateAuthorDto): Promise<void> {
    await this.authorsRepository.createAuthor(request);
  }
}

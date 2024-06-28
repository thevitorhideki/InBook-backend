import { Author } from '@/entities/author';
import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from '../authors-repository';

interface ICreateAuthorRequest {
  name: string;
  avatarUrl?: string | null;
  about?: string | null;
  birthYear?: number | null;
  nationality?: string | null;
}

interface ICreateAuthorResponse {
  author: Author;
}

@Injectable()
export class CreateAuthor {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(request: ICreateAuthorRequest): Promise<ICreateAuthorResponse> {
    const author = new Author({
      name: request.name,
      avatarUrl: request.avatarUrl,
      about: request.about,
      birthYear: request.birthYear,
      nationality: request.nationality,
    });

    await this.authorsRepository.createAuthor(author);

    return { author };
  }
}

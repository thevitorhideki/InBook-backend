import { Author, IAuthorProps } from '@database/entities/author';

type Override = Partial<IAuthorProps>;

export function makeAuthor(override: Override = {}, authorId?: string) {
  return new Author(
    {
      name: 'José de Alencar',
      ...override,
    },
    authorId,
  );
}

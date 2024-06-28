import { Author } from '@/entities/author';
import { makeAuthor } from '@test/factories/author.factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors.repository';
import { GetAuthorById } from './get-author-by-id.service';

describe('Get author by id', () => {
  let author: Author;
  const authorsRepository = new InMemoryAuthorsRepository();
  const getAuthorById = new GetAuthorById(authorsRepository);

  beforeEach(async () => {
    author = makeAuthor();
    await authorsRepository.createAuthor(author);
  });

  it('should return an author by id', async () => {
    const authorResponse = await getAuthorById.execute({ authorId: author.id });

    expect(authorResponse).toEqual(author);
  });

  it('should not be able to return an author if it does not exist', async () => {
    const authorResponse = getAuthorById.execute({ authorId: 0 });

    await expect(authorResponse).rejects.toThrow();
  });
});

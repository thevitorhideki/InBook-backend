import { Author } from '@/entities/author';
import { makeAuthor } from '@test/factories/author.factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors.repository';
import { DeleteAuthor } from './delete-author.service';

describe('Delete author by id', () => {
  let author: Author;
  const authorsRepository = new InMemoryAuthorsRepository();
  const deleteAuthor = new DeleteAuthor(authorsRepository);

  beforeEach(async () => {
    author = makeAuthor();
    await authorsRepository.createAuthor(author);
  });

  it('should be able to delete an existent author', async () => {
    await deleteAuthor.execute({ authorId: author.id });

    const authors = await authorsRepository.getAuthorById(author.id);

    expect(authors).toBeNull();
  });

  it('should not be able to delete an author if it does not exist', async () => {
    const authorResponse = deleteAuthor.execute({ authorId: 0 });

    await expect(authorResponse).rejects.toThrow();
  });
});

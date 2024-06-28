import { Author } from '@/entities/author';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors.repository';
import { CreateAuthor } from './create-author.service';

describe('Create author', () => {
  const authorsRepository = new InMemoryAuthorsRepository();
  const createAuthor = new CreateAuthor(authorsRepository);

  it('should be able to create an Author', async () => {
    const { author } = await createAuthor.execute({
      name: 'J.K. Rowling',
      avatarUrl: 'https://example.com/avatar1.jpg',
      about: 'Author of Harry Potter series',
      birthYear: 1965,
      nationality: 'British',
    });

    expect(author).toBeInstanceOf(Author);
  });
});

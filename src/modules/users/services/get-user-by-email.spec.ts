import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user.service';
import { GetUserByEmail } from './get-user-by-email.service';

describe('Get Users by Email', () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUser;
  let getUserByEmail: GetUserByEmail;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    getUserByEmail = new GetUserByEmail(usersRepository);
  });

  it('should be able to get an user by email', async () => {
    const fakeUser = makeUser({ email: 'example@email.com' });

    await createUser.execute({
      id: fakeUser.id,
      email: fakeUser.email,
    });

    const user = getUserByEmail.execute({ emailAddress: fakeUser.email });

    expect(user).toBeDefined();
  });
});

import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user.service';
import { GetAllUsers } from './get-all-users.service';

describe('Create User', () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUser;
  let getAllUsers: GetAllUsers;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    getAllUsers = new GetAllUsers(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = makeUser();

    const { userId } = await createUser.execute(user);

    const allUsers = await getAllUsers.execute();

    expect(userId).toBe(user.id);
    expect(allUsers.length).toBe(1);
  });

  it('should not be able to create an user with an email that already exits', async () => {
    const user1 = makeUser();
    const user2 = makeUser();

    await createUser.execute(user1);
    await createUser.execute(user2);

    const allUsers = await usersRepository.getAllUsers();

    expect(allUsers.length).toBe(1);
  });
});

import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user.service';
import { GetAllUsers } from './get-all-users.service';

describe('Get all Users', () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUser;
  let getAllUsers: GetAllUsers;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    getAllUsers = new GetAllUsers(usersRepository);
  });

  it('should be able to get all users', async () => {
    const user = makeUser();

    const { userId } = await createUser.execute(user);

    const allUsers = await getAllUsers.execute();

    expect(userId).toBe(user.id);
    expect(allUsers.length).toBe(1);
  });
});

import { IUserProps, User } from '@database/entities/user';

type Override = Partial<IUserProps>;

export function makeUser(override: Override = {}) {
  return new User(
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password123',
      ...override,
    },
    9999,
  );
}

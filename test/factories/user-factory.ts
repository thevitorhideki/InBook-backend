import { Profile } from '@database/entities/profile';
import { IUserProps, User } from '@database/entities/user';
import { randomUUID } from 'crypto';

type Override = Partial<IUserProps>;

export function makeUser(override: Override = {}) {
  const userId = randomUUID();

  return new User({
    id: userId,
    email: 'example@email.com',
    profile: new Profile({
      userId: userId,
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://example.com/profile_photo.jpg',
    }),
    ...override,
  });
}

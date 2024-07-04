import { IProfileProps, Profile } from '@database/entities/profile';

type Override = Partial<IProfileProps>;

export function makeProfile(override: Override = {}) {
  return new Profile({
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'https://example.com/avatar3.jpg',
    userId: 9999,
    ...override,
  });
}

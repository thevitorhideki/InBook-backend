import { randomUUID } from 'crypto';
import { Profile } from './profile';

describe('Profile', () => {
  it('should be able to create a new Profile', () => {
    const profile = new Profile({
      firstName: 'Vitor',
      lastName: 'Katakura',
      avatarUrl: 'https://example.com/avatar.jpg',
      userId: randomUUID(),
    });

    expect(profile).toBeInstanceOf(Profile);
  });
});

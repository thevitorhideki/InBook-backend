import { randomUUID } from 'crypto';
import { User } from './user';

describe('User', () => {
  it('should be able to create a new User', () => {
    const user = new User({
      id: randomUUID(),
      username: 'vitorhideki',
      email: 'thevitorhideki@gmail.com',
    });

    expect(user).toBeInstanceOf(User);
  });
});

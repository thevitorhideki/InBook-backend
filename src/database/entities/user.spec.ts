import { User } from './user';

describe('User', () => {
  it('should be able to create a new User', () => {
    const user = new User({
      username: 'vitorhideki',
      email: 'thevitorhideki@gmail.com',
      password: '#StrongPassword1',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should be able to encrypt the password', () => {
    const password = '#StrongPassword1';
    const user = new User({
      username: 'vitorhideki',
      email: 'thevitorhideki@gmail.com',
      password: password,
    });

    expect(user.password).not.toEqual(password);
  });
});

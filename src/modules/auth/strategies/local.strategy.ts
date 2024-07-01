import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUser } from '../services/validate.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private validateUser: ValidateUser) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, pass: string): Promise<any> {
    const user = await this.validateUser.execute({ username, pass });

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return user;
  }
}

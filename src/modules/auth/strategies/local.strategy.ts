import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUser } from '../services/validate.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private validateUser: ValidateUser) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.validateUser.execute({ email, pass });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}

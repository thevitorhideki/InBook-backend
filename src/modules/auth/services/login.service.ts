import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Login {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User) {
    const payload = { username: user.username, sub: user.id };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1 hour',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: '7 days',
    });

    return { access_token, refresh_token };
  }
}

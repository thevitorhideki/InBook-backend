import { User } from '@database/entities/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Login {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User) {
    const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

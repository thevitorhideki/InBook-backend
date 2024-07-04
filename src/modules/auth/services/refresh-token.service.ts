import { UsersRepository } from '@modules/users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from './login.service';

interface IRefreshTokenRequest {
  refresh_token: string;
}

@Injectable()
export class RefreshToken {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly login: Login,
  ) {}

  async execute(request: IRefreshTokenRequest) {
    const { refresh_token } = request;
    const payload = await this.verifyRefreshToken(refresh_token);

    if (!payload || !payload.username) {
      throw new UnauthorizedException('Invalid Token');
    }

    const user = await this.usersRepository.findByUsername(payload.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.login.execute(user);
  }

  private async verifyRefreshToken(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_JWT_SECRET,
      });
      return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expired');
      }
      throw new UnauthorizedException('Invalid Token');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
          'https://easy-grackle-34.clerk.accounts.dev/.well-known/jwks.json',
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'https://easy-grackle-34.clerk.accounts.dev',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}

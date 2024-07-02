import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: '<Refresh Token>' })
  @IsJWT()
  refresh_token: string;
}

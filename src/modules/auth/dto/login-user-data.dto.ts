import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDataDto {
  @ApiProperty({ example: 'JohnDoe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '#StrongPassword1' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

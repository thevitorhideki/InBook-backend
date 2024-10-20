import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDataDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '#StrongPassword1' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

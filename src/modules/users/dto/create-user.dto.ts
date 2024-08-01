import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateUserDto {
  @ApiProperty({ example: randomUUID() })
  @IsString()
  id: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

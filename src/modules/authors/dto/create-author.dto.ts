import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ required: true, example: 'Bram Stoker' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

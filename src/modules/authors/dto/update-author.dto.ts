import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty({ required: false, example: 'Bram Stoker' })
  @IsString()
  @IsOptional()
  name: string;
}

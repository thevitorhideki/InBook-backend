import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateBookDto {
  @ApiProperty({ required: true, example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ required: true, example: [randomUUID(), randomUUID()] })
  @IsNotEmpty({ message: 'Author ID is required' })
  @IsArray({ message: 'Author ID must be an Array' })
  authorIds: string[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: [randomUUID(), randomUUID()] })
  @IsArray({ message: 'Author id must be an Array' })
  @IsOptional()
  authorIds: string[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: randomUUID() })
  @IsString({ message: 'Author ID must be a string' })
  @IsOptional()
  authorId: string;
}

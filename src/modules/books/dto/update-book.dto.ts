import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt({ message: 'Author ID must be an integer' })
  @IsOptional()
  authorId: string;
}

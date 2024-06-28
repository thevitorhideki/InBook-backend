import { ApiPropertyOptional } from '@nestjs/swagger';
import { Genre, Language } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ required: true, example: 'Dracula' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ required: true, example: 'A vampire story' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ type: [Genre], required: true, enum: Genre })
  @IsEnum(Genre, { each: true, message: 'Invalid genre' })
  @IsOptional()
  genres: Genre[];

  @ApiPropertyOptional({ required: true, enum: Language })
  @IsEnum(Language, { each: true, message: 'Invalid language' })
  @IsOptional()
  language: Language;

  @ApiPropertyOptional({ required: true, example: 300 })
  @IsNumber()
  @IsOptional()
  pages: number;

  @ApiPropertyOptional({
    required: true,
    example: 180,
    description: 'Duration in minutes',
  })
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiPropertyOptional({ required: false, example: 1897 })
  @IsNumber()
  @IsOptional()
  publicationYear: number;

  @ApiPropertyOptional({
    required: false,
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  coverImageUrl: string;

  @ApiPropertyOptional({
    required: false,
    example: 'https://example.com/ebook.pdf',
  })
  @IsString()
  @IsOptional()
  ebookFileUrl: string;

  @ApiPropertyOptional({
    required: false,
    example: 'https://example.com/audiobook.mp3',
  })
  @IsString()
  @IsOptional()
  audiobookFileUrl: string;

  @ApiPropertyOptional({ required: true, example: 1 })
  @IsOptional()
  authorId: number;
}

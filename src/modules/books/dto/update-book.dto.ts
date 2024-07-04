import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: 'A vampire story' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ type: [String], enum: Genre })
  @IsEnum(Genre, { each: true, message: 'Invalid genre' })
  @IsOptional()
  genres: Genre[];

  @ApiPropertyOptional({ enum: Language })
  @IsEnum(Language, { message: 'Invalid language' })
  @IsOptional()
  language: Language;

  @ApiPropertyOptional({ example: 300 })
  @IsNumber({}, { message: 'Pages must be a number' })
  @IsPositive({ message: 'Pages must be a positive number' })
  @IsOptional()
  pages: number;

  @ApiPropertyOptional({
    example: 180,
    description: 'Duration in minutes',
  })
  @IsNumber({}, { message: 'Duration must be a number' })
  @IsPositive({ message: 'Duration must be a positive number' })
  @IsOptional()
  duration: number;

  @ApiPropertyOptional({ example: 1897 })
  @IsNumber({}, { message: 'Publication year must be a number' })
  @IsPositive({ message: 'Publication year must be a positive number' })
  @IsOptional()
  publicationYear: number | null;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsString({ message: 'Cover image URL must be a string' })
  @IsOptional()
  coverImageUrl: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/ebook.pdf' })
  @IsString({ message: 'Ebook file URL must be a string' })
  @IsOptional()
  ebookFileUrl: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/audiobook.mp3' })
  @IsString({ message: 'Audiobook file URL must be a string' })
  @IsOptional()
  audiobookFileUrl: string | null;

  @ApiPropertyOptional({ example: 1 })
  @IsInt({ message: 'Author ID must be an integer' })
  @IsOptional()
  authorId: number | null;
}

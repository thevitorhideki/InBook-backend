import { Genre } from '@database/enums/genre';
import { Language } from '@database/enums/language';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: true, example: 'Dracula' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ required: true, example: 'A vampire story' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ type: [String], required: true, enum: Genre })
  @IsNotEmpty({ message: 'At least one genre is required' })
  @IsEnum(Genre, { each: true, message: 'Invalid genre' })
  genres: Genre[];

  @ApiProperty({ required: true, enum: Language })
  @IsNotEmpty({ message: 'Language is required' })
  @IsEnum(Language, { message: 'Invalid language' })
  language: Language;

  @ApiProperty({ required: true, example: 300 })
  @IsNotEmpty({ message: 'Number of pages is required' })
  @IsNumber({}, { message: 'Pages must be a number' })
  @IsPositive({ message: 'Pages must be a positive number' })
  pages: number;

  @ApiProperty({
    required: true,
    example: 180,
    description: 'Duration in minutes',
  })
  @IsNotEmpty({ message: 'Duration is required' })
  @IsNumber({}, { message: 'Duration must be a number' })
  @IsPositive({ message: 'Duration must be a positive number' })
  duration: number;

  @ApiProperty({ required: false, example: 1897 })
  @IsNumber({}, { message: 'Publication year must be a number' })
  @IsPositive({ message: 'Publication year must be a positive number' })
  @IsOptional()
  publicationYear?: number | null;

  @ApiProperty({ required: false, example: 'https://example.com/image.jpg' })
  @IsString({ message: 'Cover image URL must be a string' })
  @IsOptional()
  coverImageUrl?: string | null;

  @ApiProperty({ required: false, example: 'https://example.com/ebook.pdf' })
  @IsString({ message: 'Ebook file URL must be a string' })
  @IsOptional()
  ebookFileUrl?: string | null;

  @ApiProperty({
    required: false,
    example: 'https://example.com/audiobook.mp3',
  })
  @IsString({ message: 'Audiobook file URL must be a string' })
  @IsOptional()
  audiobookFileUrl?: string | null;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'Author ID is required' })
  @IsInt({ message: 'Author ID must be an integer' })
  authorId: number;
}

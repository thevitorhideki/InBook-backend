import { ApiProperty } from '@nestjs/swagger';
import { Genre, Language } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: true, example: 'Dracula' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: 'A vampire story' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [Genre], required: true, enum: Genre })
  @IsNotEmpty()
  @IsEnum(Genre, { each: true, message: 'Invalid genre' })
  genres: Genre[];

  @ApiProperty({ required: true, enum: Language })
  @IsNotEmpty()
  @IsEnum(Language, { each: true, message: 'Invalid language' })
  language: Language;

  @ApiProperty({ required: true, example: 300 })
  @IsNotEmpty()
  @IsNumber()
  pages: number;

  @ApiProperty({
    required: true,
    example: 180,
    description: 'Duration in minutes',
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ required: false, example: 1897 })
  @IsNumber()
  @IsOptional()
  publicationYear?: number | null;

  @ApiProperty({ required: false, example: 'https://example.com/image.jpg' })
  @IsString()
  @IsOptional()
  coverImageUrl?: string | null;

  @ApiProperty({ required: false, example: 'https://example.com/ebook.pdf' })
  @IsString()
  @IsOptional()
  ebookFileUrl?: string | null;

  @ApiProperty({
    required: false,
    example: 'https://example.com/audiobook.mp3',
  })
  @IsString()
  @IsOptional()
  audiobookFileUrl?: string | null;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  authorId: number;
}

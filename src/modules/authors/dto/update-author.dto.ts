import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty({ required: false, example: 'Bram Stoker' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatarUrl?: string | null;

  @ApiProperty({ required: false, example: 'An Irish author' })
  @IsString()
  @IsOptional()
  about?: string | null;

  @ApiProperty({ required: false, example: 1847 })
  @IsInt()
  @IsOptional()
  birthYear?: number | null;

  @ApiProperty({ required: false, example: 'Irish' })
  @IsString()
  @IsOptional()
  nationality?: string | null;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  recommended: boolean;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  enjoyedContent: boolean;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  enjoyedNarrator: boolean;

  @ApiPropertyOptional({ example: 'Great book' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Really enjoy the content and the narrators voice',
  })
  @IsString()
  @IsOptional()
  content?: string;
}

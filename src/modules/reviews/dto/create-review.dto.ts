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
  enjoyedNarration: boolean;

  @ApiPropertyOptional({ example: 'Great book' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Really enjoy the content and the narrations voice',
  })
  @IsString()
  @IsOptional()
  content?: string;
}

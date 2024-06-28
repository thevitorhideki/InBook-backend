import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateAuthor } from '@/modules/authors/services/create-author.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private createAuthor: CreateAuthor) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided',
  })
  async create(@Body() body: CreateAuthorDto) {
    await this.createAuthor.execute(body);
  }
}

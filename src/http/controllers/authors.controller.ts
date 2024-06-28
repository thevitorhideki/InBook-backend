import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateAuthor } from '@/modules/authors/services/create-author.service';
import { GetAuthorById } from '@/modules/authors/services/get-author-by-id.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorViewModel } from '../view-models/author-view-model';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private createAuthor: CreateAuthor,
    private getAuthorById: GetAuthorById,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  async getById(@Param('id') id: string) {
    const author = await this.getAuthorById.execute({ authorId: parseInt(id) });

    return AuthorViewModel.toHTTP(author);
  }

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

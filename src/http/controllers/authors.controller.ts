import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateAuthor } from '@/modules/authors/services/create-author.service';
import { GetAuthorById } from '@/modules/authors/services/get-author-by-id.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorViewModel } from '../view-models/author-view-model';
import { DeleteAuthor } from '@/modules/authors/services/delete-author.service';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private createAuthor: CreateAuthor,
    private getAuthorById: GetAuthorById,
    private deleteAuthor: DeleteAuthor,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by id' })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by id' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  async delete(@Param('id') id: string) {
    await this.deleteAuthor.execute({ authorId: parseInt(id) });
  }
}

import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateAuthor } from '@/modules/authors/services/create-author.service';
import { DeleteAuthor } from '@/modules/authors/services/delete-author.service';
import { GetAuthorById } from '@/modules/authors/services/get-author-by-id.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorDetailsDto } from './dto/author-details';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly createAuthor: CreateAuthor,
    private readonly getAuthorById: GetAuthorById,
    private readonly deleteAuthor: DeleteAuthor,
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
  async getById(@Param('id') id: string): Promise<AuthorDetailsDto> {
    const author = await this.getAuthorById.execute({ authorId: parseInt(id) });

    return AuthorDetailsDto.fromEntity(author);
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

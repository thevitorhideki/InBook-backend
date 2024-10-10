import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorDetailsDto } from './dto/author-details';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  CreateAuthor,
  CreateAuthorResponse,
} from './services/create-author.service';
import { DeleteAuthor } from './services/delete-author.service';
import { GetAuthorById } from './services/get-author-by-id.service';
import { GetAuthorsByName } from './services/get-authors-by-name.service';
import { GetAuthors } from './services/get-authors.service';
import { UpdateAuthor } from './services/update-author.service';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly createAuthor: CreateAuthor,
    private readonly getAuthors: GetAuthors,
    private readonly getAuthorById: GetAuthorById,
    private readonly getAuthorsByName: GetAuthorsByName,
    private readonly deleteAuthor: DeleteAuthor,
    private readonly updateAuthor: UpdateAuthor,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Authors' })
  @ApiResponse({
    status: 200,
    description: 'The authors has been successfully retrieved',
  })
  @ApiQuery({
    name: 'name',
    required: false, // Definindo como não obrigatório
    description: 'The name of the author to search for',
    type: String,
  })
  async fetchAutors(@Query('name') name?: string): Promise<any> {
    if (name) {
      return await this.getAuthorsByName.execute({ name });
    }

    return await this.getAuthors.execute();
  }

  @Get(':authorId')
  @ApiOperation({ summary: 'Get an author by id' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  async getById(@Param('authorId') id: string): Promise<AuthorDetailsDto> {
    const author = await this.getAuthorById.execute({ authorId: id });

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
  async create(@Body() body: CreateAuthorDto): Promise<CreateAuthorResponse> {
    return await this.createAuthor.execute(body);
  }

  @Put(':authorId')
  @ApiOperation({ summary: 'Update an author by id' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  async update(@Param('authorId') id: string, @Body() body: UpdateAuthorDto) {
    await this.updateAuthor.execute({
      authorId: id,
      authorData: body,
    });
  }

  @Delete(':authorId')
  @ApiOperation({ summary: 'Delete an author by id' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  async delete(@Param('authorId') id: string) {
    await this.deleteAuthor.execute({ authorId: id });
  }
}

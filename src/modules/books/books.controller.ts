import { Genre } from '@/database/enums/genre';
import { CreateBookDto } from '@/modules/books/dto/create-book.dto';
import { UpdateBookDto } from '@/modules/books/dto/update-book.dto';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { GetBookById } from '@/modules/books/services/get-book-by-id.service';
import { UpdateBook } from '@/modules/books/services/update-book.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { BookCollectionDto } from './dto/book-collection.dto';
import { BookDetailsDto } from './dto/book-details.dto';
import { GetBooksByGenre } from './services/get-books-by-genre.service';

@ApiTags('Books')
@Controller()
export class BooksController {
  constructor(
    private readonly createBook: CreateBook,
    private readonly deleteBook: DeleteBook,
    private readonly getBookById: GetBookById,
    private readonly updateBook: UpdateBook,
    private readonly getBooksByGenre: GetBooksByGenre,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  @ApiResponseProperty({ type: BookDetailsDto })
  async getById(@Param('id') id: string): Promise<BookDetailsDto> {
    return await this.getBookById.execute({ bookId: parseInt(id) });
  }

  @Get()
  @ApiOperation({ summary: 'Get books by genre' })
  @ApiResponse({
    status: 200,
    description: 'The books have been successfully retrieved',
  })
  @ApiResponseProperty({ type: [BookDetailsDto] })
  @ApiQuery({ name: 'genre', enum: Genre, required: true })
  @ApiQuery({ name: 'limit', required: false })
  async getByGenre(
    @Query('genre') genre: Genre,
    @Query('limit') limit: string,
  ): Promise<BookCollectionDto> {
    if (!Object.values(Genre).includes(genre)) {
      throw new HttpException({ message: 'Invalid genre' }, 400);
    }

    return await this.getBooksByGenre.execute({
      genre,
      limit: parseInt(limit),
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided',
  })
  async create(@Body() body: CreateBookDto) {
    await this.createBook.execute(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  async update(@Param('id') id: string, @Body() body: UpdateBookDto) {
    await this.updateBook.execute({ bookId: parseInt(id), bookData: body });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  async delete(@Param('id') id: string) {
    await this.deleteBook.execute({ bookId: parseInt(id) });
  }
}

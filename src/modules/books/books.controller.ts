import { clerkClient } from '@clerk/clerk-sdk-node';
import { Genre } from '@database/enums/genre';
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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBook } from './services/create-book.service';
import { DeleteBook } from './services/delete-book.service';
import { GetBookById } from './services/get-book-by-id.service';
import { GetBooksByGenre } from './services/get-books-by-genre.service';
import { UpdateBook } from './services/update-book.service';

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

  @Get(':bookId')
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
  async getById(@Param('bookId') id: string): Promise<BookDetailsDto> {
    console.log(await clerkClient.users.getUserList());
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

  @Put(':bookId')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  async update(@Param('bookId') id: string, @Body() body: UpdateBookDto) {
    await this.updateBook.execute({ bookId: parseInt(id), bookData: body });
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The book was not found',
  })
  async delete(@Param('bookId') id: string) {
    await this.deleteBook.execute({ bookId: parseInt(id) });
  }
}

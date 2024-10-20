import { Admin } from '@modules/auth/decorators/admin.decorator';
import { AdminGuard } from '@modules/auth/guards/admin.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { BookDetailsDto } from './dto/book-details.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBook } from './services/create-book.service';
import { DeleteBook } from './services/delete-book.service';
import { GetAllBooks } from './services/get-all-books.service';
import { GetBookById } from './services/get-book-by-id.service';
import { GetBooksByTitle } from './services/get-books-by-title.service';
import { UpdateBook } from './services/update-book.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly getAllBooks: GetAllBooks,
    private readonly createBook: CreateBook,
    private readonly deleteBook: DeleteBook,
    private readonly getBookById: GetBookById,
    private readonly updateBook: UpdateBook,
    private readonly getBooksByTitle: GetBooksByTitle,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'The books have been successfully retrieved',
  })
  @ApiQuery({
    name: 'title',
    required: false, // Definindo como não obrigatório
    description: 'The name of the book to search for',
    type: String,
  })
  @ApiResponseProperty({ type: [BookDetailsDto] })
  async getAll(@Query('title') title?: string): Promise<BookDetailsDto[]> {
    if (title) {
      return await this.getBooksByTitle.execute({ title });
    }
    return await this.getAllBooks.execute();
  }

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
    return await this.getBookById.execute({ bookId: id });
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Admin()
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
    const { bookId } = await this.createBook.execute(body);

    return { bookId };
  }

  @Put(':bookId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Admin()
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
    await this.updateBook.execute({ bookId: id, bookData: body });
  }

  @Delete(':bookId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Admin()
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
    await this.deleteBook.execute({ bookId: id });
  }
}

import { CreateBookDto } from '@/modules/books/dto/create-book.dto';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { GetBookById } from '@/modules/books/services/get-book-by-id.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookViewModel } from '../view-models/book-view-model';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(
    private createBook: CreateBook,
    private deleteBook: DeleteBook,
    private getBookById: GetBookById,
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
  async getById(@Param('id') id: string) {
    const book = await this.getBookById.execute({ bookId: parseInt(id) });

    return { book: BookViewModel.toHTTP(book) };
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

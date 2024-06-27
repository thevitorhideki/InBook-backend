import { CreateBookDto } from '@/modules/books/dto/create-book.dto';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { GetBookById } from '@/modules/books/services/get-book-by-id.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async getById(@Param('id') id: string) {
    const book = await this.getBookById.execute({ bookId: parseInt(id) });

    return { book: BookViewModel.toHTTP(book) };
  }

  @Post()
  async create(@Body() body: CreateBookDto) {
    await this.createBook.execute(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteBook.execute({ bookId: parseInt(id) });
  }
}

import { CreateBookDto } from '@/modules/books/dto/create-book.dto';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { DeleteBook } from '@/modules/books/services/delete-book.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(
    private createBook: CreateBook,
    private deleteBook: DeleteBook,
  ) {}

  @Post()
  async create(@Body() body: CreateBookDto) {
    await this.createBook.execute(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteBook.execute({ bookId: parseInt(id) });
  }
}

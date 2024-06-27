import { CreateBookDto } from '@/modules/books/dto/create-book.dto';
import { CreateBook } from '@/modules/books/services/create-book.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private createBook: CreateBook) {}

  @Post()
  async create(@Body() body: CreateBookDto) {
    await this.createBook.execute(body);
  }
}

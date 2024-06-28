import { Module } from '@nestjs/common';
import { CreateAuthor } from './services/create-author.service';
import { DeleteAuthor } from './services/delete-author.service';
import { GetAuthorById } from './services/get-author-by-id.service';
import { AuthorsController } from '@/http/controllers/authors.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAuthor, GetAuthorById, DeleteAuthor],
  controllers: [AuthorsController],
})
export class AuthorsModule {}

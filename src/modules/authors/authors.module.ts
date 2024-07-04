import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { CreateAuthor } from './services/create-author.service';
import { DeleteAuthor } from './services/delete-author.service';
import { GetAuthorById } from './services/get-author-by-id.service';
import { UpdateAuthor } from './services/update-author.service';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAuthor, GetAuthorById, DeleteAuthor, UpdateAuthor],
  controllers: [AuthorsController],
})
export class AuthorsModule {}

import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthorsModule } from '@modules/authors/authors.module';
import { BooksModule } from '@modules/books/books.module';
import { TextToSpeechModule } from '@modules/text-to-speech/text-to-speech.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    TextToSpeechModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}

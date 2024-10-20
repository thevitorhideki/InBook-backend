import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CreateUser } from './services/create-user.service';
import { FindUserByEmail } from './services/find-by-email.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUser, FindUserByEmail],
  controllers: [UsersController],
})
export class UsersModule {}

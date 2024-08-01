import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CreateUser } from './services/create-user.service';
import { GetAllUsers } from './services/get-all-users.service';
import { GetUserByEmail } from './services/get-user-by-email.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUser, GetUserByEmail, GetAllUsers],
  controllers: [UsersController],
})
export class UsersModule {}

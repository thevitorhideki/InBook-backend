import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CreateUser } from './services/create-user.service';
import { FindUserByUsername } from './services/find-by-username.service';
import { GetUserDetails } from './services/get-user-details.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUser, FindUserByUsername, GetUserDetails],
  controllers: [UsersController],
})
export class UsersModule {}

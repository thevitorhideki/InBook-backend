import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/creat-user.dto';
import { CreateUser } from './services/create-user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data provided',
  })
  async create(@Body() body: CreateUserDto) {
    await this.createUser.execute(body);
  }
}

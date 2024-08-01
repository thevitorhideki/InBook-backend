import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetailsDto } from './dto/user-details.dto';
import { CreateUser } from './services/create-user.service';
import { GetAllUsers } from './services/get-all-users.service';
import { GetUserByEmail } from './services/get-user-by-email.service';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(
    private readonly getUserByEmail: GetUserByEmail,
    private readonly createUser: CreateUser,
    private readonly getAllUsers: GetAllUsers,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users has been successfully retrieved',
  })
  async getAll(): Promise<UserDetailsDto[]> {
    return await this.getAllUsers.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided',
  })
  async create(@Body() body: CreateUserDto): Promise<{ userId: string }> {
    return await this.createUser.execute(body);
  }

  @Get(':emailAddress')
  @ApiOperation({ summary: 'Get user by email' })
  async getByEmail(
    @Param('emailAddress') emailAddress: string,
  ): Promise<UserDetailsDto> {
    return await this.getUserByEmail.execute({ emailAddress });
  }
}

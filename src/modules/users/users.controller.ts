import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetailsDto } from './dto/user-details.dto';
import { CreateUser } from './services/create-user.service';
import { GetUserByEmail } from './services/get-user-by-email.service';
import { GetUserDetails } from './services/get-user-details.service';

@ApiTags('Account')
@Controller()
export class UsersController {
  constructor(
    private readonly getUserDetails: GetUserDetails,
    private readonly getUserByEmail: GetUserByEmail,
    private readonly createUser: CreateUser,
  ) {}

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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({
    status: 200,
    description: 'The user details have been successfully retrieved',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  async getUser(@Req() req: any): Promise<UserDetailsDto> {
    return await this.getUserDetails.execute({ userId: req.user.userId });
  }
}

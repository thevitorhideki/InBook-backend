import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDataDto } from './dto/login-user-data.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Login } from './services/login.service';
import { Register } from './services/register.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: Register,
    private readonly login: Login,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data provided',
  })
  async registerUser(@Body() body: CreateUserDto) {
    return await this.register.execute(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBody({ type: LoginUserDataDto })
  async loginUser(@Request() req: any) {
    return this.login.execute(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the user profile' })
  getProfile(@Request() req: any) {
    return req.user;
  }
}

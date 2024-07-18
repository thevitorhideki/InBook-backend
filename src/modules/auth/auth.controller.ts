import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDataDto } from './dto/login-user-data.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Login } from './services/login.service';
import { RefreshToken } from './services/refresh-token.service';
import { Register } from './services/register.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: Register,
    private readonly login: Login,
    private readonly refreshToken: RefreshToken,
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

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh a user token' })
  @ApiResponse({
    status: 201,
    description: 'The user token has been successfully refreshed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid token',
  })
  async refresh(@Body() body: RefreshTokenDto) {
    const { refresh_token } = body;

    return await this.refreshToken.execute({ refresh_token });
  }
}

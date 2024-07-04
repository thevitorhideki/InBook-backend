import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDetailsDto } from './dto/user-details.dto';
import { GetUserDetails } from './services/get-user-details.service';

@ApiTags('Account')
@UseGuards(JwtAuthGuard)
@Controller()
export class UsersController {
  constructor(private readonly getUserDetails: GetUserDetails) {}

  @Get()
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

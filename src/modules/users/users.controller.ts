import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDetails } from './services/get-user-details.service';
import { UpdateUser } from './services/update-user.service';

@ApiTags('Account')
@UseGuards(JwtAuthGuard)
@Controller('account')
export class UsersController {
  constructor(
    private readonly getUserDetails: GetUserDetails,
    private readonly updateUser: UpdateUser,
  ) {}

  @Get()
  @ApiBearerAuth()
  async getUser(@Req() req: any): Promise<UpdateUserDto> {
    return await this.getUserDetails.execute({ userId: req.user.userId });
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'The data is invalid',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  async update(@Req() req: any, @Body() body: UpdateUserDto) {
    return await this.updateUser.execute({
      userId: req.user.userId,
      userData: body,
    });
  }
}

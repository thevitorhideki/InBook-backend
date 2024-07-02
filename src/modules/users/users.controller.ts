import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUser } from './services/update-user.service';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly updateUser: UpdateUser) {}

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

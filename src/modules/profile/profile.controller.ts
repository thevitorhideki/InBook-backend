import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateProfile } from './services/create-profile.service';

@ApiTags('Account')
@UseGuards(JwtAuthGuard)
@Controller()
export class ProfileController {
  constructor(private readonly createProfile: CreateProfile) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create profile' })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'The data is invalid' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 409, description: 'The User already has a profile' })
  async create(@Request() req: any, @Body() body: CreateProfileDto) {
    return this.createProfile.execute({
      userId: req.user.userId,
      profileData: body,
    });
  }
}

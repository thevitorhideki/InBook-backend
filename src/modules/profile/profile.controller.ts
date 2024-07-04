import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateProfile } from './services/create-profile.service';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly createProfile: CreateProfile) {}

  @Post()
  @ApiBearerAuth()
  async create(@Request() req: any, @Body() body: CreateProfileDto) {
    return this.createProfile.execute({
      userId: req.user.userId,
      profileData: body,
    });
  }
}

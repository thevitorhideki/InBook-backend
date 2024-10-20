import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Account')
@UseGuards(JwtAuthGuard)
@Controller()
export class UsersController {
  constructor() {}
}

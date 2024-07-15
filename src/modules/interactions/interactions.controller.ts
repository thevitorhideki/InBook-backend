import { InteractionType } from '@database/enums/interaction';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInteraction } from './services/create-interaction.service';
import { RemoveInteraction } from './services/remove-interaction.service';

@ApiTags('Interactions')
@UseGuards(JwtAuthGuard)
@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly createInteraction: CreateInteraction,
    private readonly removeInteraction: RemoveInteraction,
  ) {}

  @Post(':bookId')
  @ApiOperation({ summary: 'Create an interaction' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Interaction created successfully',
  })
  @ApiQuery({ name: 'type', enum: InteractionType, required: true })
  async create(
    @Request() req: any,
    @Param('bookId') bookId: string,
    @Query('type') type: InteractionType,
  ) {
    const userId = req.user.userId;

    return await this.createInteraction.execute({
      userId,
      bookId: parseInt(bookId),
      type,
    });
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Remove an interaction' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Interaction removed successfully',
  })
  @ApiQuery({ name: 'type', enum: InteractionType, required: true })
  async remove(
    @Request() req: any,
    @Param('bookId') bookId: string,
    @Query('type') type: InteractionType,
  ) {
    const userId = req.user.userId;

    return await this.removeInteraction.execute({
      userId,
      bookId: parseInt(bookId),
      type,
    });
  }
}

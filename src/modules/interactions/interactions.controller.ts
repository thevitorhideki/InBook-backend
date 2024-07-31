import { InteractionType } from '@database/enums/interaction';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
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
import { GetInteractionsByUserAndBook } from './services/get-interactions-by-user-and-book.service';
import { GetInteractionsByUser } from './services/get-interactionts-by-user.service';
import { RemoveInteraction } from './services/remove-interaction.service';

@ApiTags('Interactions')
@UseGuards(JwtAuthGuard)
@Controller()
export class InteractionsController {
  constructor(
    private readonly createInteraction: CreateInteraction,
    private readonly removeInteraction: RemoveInteraction,
    private readonly getInteractionsByUserAndBook: GetInteractionsByUserAndBook,
    private readonly getInteractionsByUser: GetInteractionsByUser,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get interactions by user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Interactions retrieved successfully',
  })
  async getByUser(@Request() req: any) {
    const userId = req.user.userId;

    return await this.getInteractionsByUser.execute(userId);
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Get interactions by book and user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Interactions retrieved successfully',
  })
  async getByUserAndBook(@Request() req: any, @Param('bookId') bookId: string) {
    const userId = req.user.userId;

    return await this.getInteractionsByUserAndBook.execute(
      parseInt(bookId),
      userId,
    );
  }

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

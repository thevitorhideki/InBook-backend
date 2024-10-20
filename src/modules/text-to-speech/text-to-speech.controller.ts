import { Admin } from '@modules/auth/decorators/admin.decorator';
import { AdminGuard } from '@modules/auth/guards/admin.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ConvertTextToSpeechDto } from './dto/convert-text-to-speech.dto';
import { ConvertTextToSpeech } from './services/text-to-speech.service';

@ApiTags('Text to Speech')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('tts')
export class TextToSpeechController {
  constructor(private readonly convertTextToSpeech: ConvertTextToSpeech) {}

  @Post()
  @Admin()
  @ApiOperation({ summary: 'Convert text to speech' })
  @ApiResponse({
    status: 200,
    description: 'The text has been converted',
  })
  async convert(@Body() body: ConvertTextToSpeechDto, @Res() res: Response) {
    const { buffer } = await this.convertTextToSpeech.execute(body);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="output.mp3"',
    });

    res.send(buffer);
  }
}

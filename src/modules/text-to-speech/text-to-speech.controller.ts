import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConvertTextToSpeechDto } from './dto/convert-text-to-speech.dto';
import { ConvertTextToSpeech } from './services/text-to-speech.service';

@ApiTags('Text to Speech')
@Controller('tts')
export class TextToSpeechController {
  constructor(private readonly convertTextToSpeech: ConvertTextToSpeech) {}

  @Post()
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

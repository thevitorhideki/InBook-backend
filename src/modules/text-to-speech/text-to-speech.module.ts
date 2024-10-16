import { Module } from '@nestjs/common';
import { ConvertTextToSpeech } from './services/text-to-speech.service';
import { TextToSpeechController } from './text-to-speech.controller';

@Module({
  providers: [ConvertTextToSpeech],
  controllers: [TextToSpeechController],
})
export class TextToSpeechModule {}

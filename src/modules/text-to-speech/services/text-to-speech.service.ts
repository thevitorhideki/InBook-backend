import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

interface ConvertTextToSpeechRequest {
  text: string;
}

@Injectable()
export class ConvertTextToSpeech {
  async execute({
    text,
  }: ConvertTextToSpeechRequest): Promise<{ buffer: Buffer }> {
    const openai = new OpenAI();

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return { buffer };
  }
}

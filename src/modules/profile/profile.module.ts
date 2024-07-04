import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { CreateProfile } from './services/create-profile.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [CreateProfile],
})
export class ProfileModule {}

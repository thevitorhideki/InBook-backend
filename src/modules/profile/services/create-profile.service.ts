import { Profile } from '@database/entities/profile';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileRepository } from '../profile.repository';

interface ICreateProfileRequest {
  userId: string;
  profileData: CreateProfileDto;
}

@Injectable()
export class CreateProfile {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(request: ICreateProfileRequest): Promise<void> {
    const { userId, profileData } = request;

    const profile = new Profile({
      userId,
      ...profileData,
    });

    await this.profileRepository.createProfile(profile);
  }
}

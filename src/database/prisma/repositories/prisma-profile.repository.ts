import { Profile } from '@database/entities/profile';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaProfileMapper } from '../mappers/prisma-profile.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: Profile) {
    const raw = PrismaProfileMapper.toPrisma(profile);

    try {
      await this.prisma.profile.create({
        data: {
          user_id: raw.user_id,
          avatar_url: raw.avatar_url,
          first_name: raw.first_name,
          last_name: raw.last_name,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException('You already have a profile');
      }
    }
  }
}

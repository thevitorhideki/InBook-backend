import { Profile } from '@database/entities/profile';
import { Injectable } from '@nestjs/common';
import { PrismaProfileMapper } from '../mappers/prisma-profile.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: Profile) {
    const raw = PrismaProfileMapper.toPrisma(profile);

    await this.prisma.profile.create({
      data: raw,
    });
  }
}

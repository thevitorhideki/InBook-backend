import { Profile } from '@/database/entities/profile';

export class PrismaProfileMapper {
  static toPrisma(profile: Profile) {
    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatarUrl: profile.avatarUrl,
      userId: profile.userId,
    };
  }
}

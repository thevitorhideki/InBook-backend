import { Profile } from '@database/entities/profile';

export class PrismaProfileMapper {
  static toPrisma(profile: Profile) {
    return {
      user_id: profile.userId,
      first_name: profile.firstName,
      last_name: profile.lastName,
      avatar_url: profile.avatarUrl,
    };
  }
}

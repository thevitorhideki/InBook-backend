import { Profile } from '@database/entities/profile';

export abstract class ProfileRepository {
  abstract createProfile(userData: Profile): Promise<void>;
}

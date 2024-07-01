import { User } from '@/database/entities/user';
import { UsersRepository } from '@/modules/users/users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: User): Promise<any> {
    const raw = PrismaUserMapper.toPrisma(userData);

    try {
      await this.prisma.user.create({ data: raw });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        throw new BadRequestException('User already exists');
      } else if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('email')
      ) {
        throw new BadRequestException('Email already exists');
      } else {
        throw error;
      }
    }
  }
}

import { User } from '@database/entities/user';
import { UsersRepository } from '@modules/users/users.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(userData);

    try {
      const user = await this.prisma.user.create({ data: raw });

      return PrismaUserMapper.toEntity(user);
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new BadRequestException('email already exists');
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

  async findByEmail(email: string): Promise<any | undefined> {
    try {
      const raw = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });

      return raw;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new UnauthorizedException('Invalid email or password');
      }
      throw error;
    }
  }

  async findById(userId: string): Promise<any | undefined> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return PrismaUserMapper.toEntity(user);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new UnauthorizedException('User not found');
      }
      throw error;
    }
  }
}

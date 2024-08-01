import { User } from '@database/entities/user';
import { UsersRepository } from '@modules/users/users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        profile: {
          select: {
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
    });

    return users.map(PrismaUserMapper.toEntity);
  }

  async findByEmail(emailAddress: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: emailAddress },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              first_name: true,
              last_name: true,
              avatar_url: true,
            },
          },
        },
      });

      return PrismaUserMapper.toEntity(user);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findById(userId: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              first_name: true,
              last_name: true,
              avatar_url: true,
            },
          },
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

  async createUser(userData: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(userData);

    try {
      await this.prisma.user.create({ data: raw });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new BadRequestException('Email already exists');
      } else {
        throw error;
      }
    }
  }
}

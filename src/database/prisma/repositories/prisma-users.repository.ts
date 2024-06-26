import { User } from '@/database/entities/user';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UsersRepository } from '@/modules/users/users.repository';
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

  async findByUsername(username: string): Promise<any> {
    try {
      const raw = await this.prisma.user.findUniqueOrThrow({
        where: { username },
      });

      return raw;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new UnauthorizedException('Invalid username or password');
      }
      throw error;
    }
  }

  async createUser(userData: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(userData);

    try {
      const user = await this.prisma.user.create({ data: raw });

      return PrismaUserMapper.toEntity(user);
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

  async updateUser(userId: number, userData: UpdateUserDto): Promise<any> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: userData,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        throw new BadRequestException('This username was already taken');
      } else if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('email')
      ) {
        throw new BadRequestException('This email was already taken');
      } else {
        throw error;
      }
    }
  }
}

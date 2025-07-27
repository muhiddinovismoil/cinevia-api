import { UserService } from '@modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { SignUpUserDto } from './dto/request';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async create(payload: SignUpUserDto) {
    try {
      
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'create');
    }
  }

  findAll() {
    return `This action returns all s`;
  }

  findOne(id: string) {
    return `This action returns a #id `;
  }

  update(id: string) {
    return `This action updates a #id `;
  }

  remove(id: string) {
    return `This action removes a #id `;
  }
}

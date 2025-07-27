import { UserService } from '@modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  create() {
    return 'This action adds a new ';
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

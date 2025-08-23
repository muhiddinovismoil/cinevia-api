import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

import { CreateHistoryDto, UpdateHistoryDto } from './dto/request';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateHistoryDto) {
    return;
  }

  async findAll() {
    return;
  }

  async findOne(id: string) {
    return;
  }

  async update(id: string, payload: UpdateHistoryDto) {
    return;
  }

  async remove(id: string) {
    return;
  }
}

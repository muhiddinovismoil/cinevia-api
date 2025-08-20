import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { FindAllUsersDto } from './dto/request';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/statistics')
  async getStatistics() {
    return await this.adminService.statistics();
  }

  @Get('/users')
  async getPlatformUsers(@Query() query: FindAllUsersDto) {
    return this.adminService.getAllUsers(query);
  }
}

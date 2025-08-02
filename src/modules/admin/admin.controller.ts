import { CurrentUser } from '@decorators';
import { Controller, Get } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/statistics')
  async getStatistics() {
    return await this.adminService.statistics();
  }
}

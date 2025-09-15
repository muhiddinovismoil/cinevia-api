import { BaseFindDto } from '@dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { WatchStatus } from '@prisma/client';

export class FindAllHistoryDto extends BaseFindDto {
  @ApiPropertyOptional()
  status: WatchStatus;
}

import { BaseFindDto } from '@dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { WatchStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllHistoryDto extends BaseFindDto {
  @ApiPropertyOptional({ enum: WatchStatus })
  @IsOptional()
  @IsEnum(WatchStatus)
  status?: WatchStatus;
}

import { Limit, Page } from '@decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseFindDto {
  @ApiPropertyOptional()
  @Page()
  pageNumber?: number;

  @ApiPropertyOptional()
  @Limit()
  pageSize?: number;
}

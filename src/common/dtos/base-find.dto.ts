import { Limit, Page } from '@decorators';
import { Pagination } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseFindDto {
  @ApiPropertyOptional()
  @Page()
  pageNumber?: number = Pagination.PAGE_NUMBER;

  @ApiPropertyOptional()
  @Limit()
  pageSize?: number = Pagination.PAGE_SIZE;
}

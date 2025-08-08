import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;
}

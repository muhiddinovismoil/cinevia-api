import { BaseFindDto } from '@dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllDto extends BaseFindDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;
}

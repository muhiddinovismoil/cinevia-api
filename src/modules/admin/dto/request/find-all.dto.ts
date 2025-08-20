import { BaseFindDto } from '@dtos';
import { SortEnum } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindAllUsersDto extends BaseFindDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsEnum(SortEnum)
  @IsOptional()
  sort: SortEnum;
}

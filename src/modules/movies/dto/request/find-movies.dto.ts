import { BaseFindDto } from '@dtos';
import { SortEnum } from '@enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTypes } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FetchMovieDto extends BaseFindDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(MovieTypes)
  movieType?: MovieTypes;

  @ApiPropertyOptional()
  @IsEnum(SortEnum)
  @IsOptional()
  sort?: SortEnum;
}

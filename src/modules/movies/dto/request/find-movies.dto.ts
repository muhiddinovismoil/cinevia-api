import { BaseFindDto } from '@dtos';
import { SortEnum } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional({
    enum: MovieTypes,
  })
  @IsOptional()
  @IsEnum(MovieTypes)
  movieType?: MovieTypes;

  @ApiPropertyOptional({ enum: SortEnum })
  @IsEnum(SortEnum)
  @IsOptional()
  sort?: SortEnum;
}

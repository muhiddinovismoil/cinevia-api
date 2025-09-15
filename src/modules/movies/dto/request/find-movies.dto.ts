import { BaseFindDto } from '@dtos';
import { SortEnum } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTypes } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

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
    enum: [MovieTypes.MOVIE, MovieTypes.SERIES, MovieTypes.CARTOON],
  })
  @IsOptional()
  @IsEnum(MovieTypes)
  movieType?: MovieTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  releaseYear?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  imdbRating: number;

  @ApiPropertyOptional({ enum: SortEnum })
  @IsEnum(SortEnum)
  @IsOptional()
  sort?: SortEnum;
}

export class FindRecommendedsDto {
  @ApiPropertyOptional({
    description: 'IMDB rating (float)',
    example: 8.8,
    type: Number,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  imdbRating?: number;

  @ApiPropertyOptional({
    enum: MovieTypes,
  })
  @IsOptional()
  @IsEnum(MovieTypes)
  movieType?: MovieTypes;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  movieId?: string;
}

export class FindById extends BaseFindDto {}

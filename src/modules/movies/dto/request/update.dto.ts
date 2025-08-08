import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTypes, UploadTypes } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSeasonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  number: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  movieId: string;
}

export class UpdateMovieDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(MovieTypes)
  type: MovieTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UploadTypes)
  uploadType: UploadTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  releaseYear: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  director: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cast: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  imdbRating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  viewCount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  averageRating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId: string;
}

export class UpdateEpisodeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  number: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UploadTypes)
  uploadType: UploadTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seasonId: string;
}

import { BaseFindDto } from '@dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTypes } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FetchMovieDto extends BaseFindDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(MovieTypes)
  movieType: MovieTypes;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country: string;
}

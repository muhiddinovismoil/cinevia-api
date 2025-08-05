import { ApiProperty } from '@nestjs/swagger';
import { MovieTypes, UploadTypes } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsEnum(MovieTypes)
  type: MovieTypes;

  @ApiProperty()
  @IsEnum(UploadTypes)
  uploadType: UploadTypes;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  releaseYear: number;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  cast: string;

  @ApiProperty()
  @IsNumber()
  imdbRating: number;

  @ApiProperty()
  @IsNumber()
  viewCount: number;

  @ApiProperty()
  @IsNumber()
  averageRating: number;

  @ApiProperty()
  @IsString()
  categoryId: string;
}

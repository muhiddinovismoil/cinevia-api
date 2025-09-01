import { ApiProperty } from '@nestjs/swagger';
import { MovieTypes, UploadTypes } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class GetMovieTitleIdResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;
}

export class MovieResponseDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsUrl()
  thumbnail: string;

  @ApiProperty({})
  @IsEnum(MovieTypes)
  type: MovieTypes;

  @ApiProperty()
  @IsEnum(UploadTypes)
  uploadType: UploadTypes;

  @ApiProperty()
  @IsUrl()
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
  @IsUUID('4')
  categoryId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

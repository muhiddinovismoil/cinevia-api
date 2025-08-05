import { ApiProperty } from '@nestjs/swagger';
import { UploadTypes } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  number: number;

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
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsString()
  seasonId: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WatchStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpsertHistoryDto {
  @ApiProperty()
  @IsUUID('4')
  movieId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  episodeId?: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  progress: number;

  @ApiProperty()
  @IsEnum(WatchStatus)
  status: WatchStatus;
}

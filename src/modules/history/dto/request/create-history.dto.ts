import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WatchStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty()
  @IsUUID('4')
  userId: string;

  @ApiProperty()
  @IsUUID('4')
  movieId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  episodeId: string;

  @ApiProperty()
  @IsNumber()
  watchedDuration: number;

  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsEnum(WatchStatus)
  status: WatchStatus;
}

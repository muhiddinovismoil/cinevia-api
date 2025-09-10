import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsUUID('4')
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  movieId: string;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsString()
  review: string;
}

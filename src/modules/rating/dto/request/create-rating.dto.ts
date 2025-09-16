import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
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

export class DeleteRatingDto extends OmitType(CreateRatingDto, [
  'rating',
  'review',
]) {}

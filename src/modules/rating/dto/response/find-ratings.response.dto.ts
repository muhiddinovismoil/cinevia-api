import { ApiProperty } from '@nestjs/swagger';

export class FindRatingsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  review: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

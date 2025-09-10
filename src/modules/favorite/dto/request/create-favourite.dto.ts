import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavouriteDto {
  @ApiProperty()
  @IsUUID('4')
  movieId: string;
}

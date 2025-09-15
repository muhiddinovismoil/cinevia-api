import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MovieResponseDto } from 'modules/movies/dto/response';

export class OmittedMovieResponseDto extends OmitType(MovieResponseDto, [
  'category',
  'favorites',
]) {}

export class FindAllResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: OmittedMovieResponseDto })
  movie: OmittedMovieResponseDto;
}

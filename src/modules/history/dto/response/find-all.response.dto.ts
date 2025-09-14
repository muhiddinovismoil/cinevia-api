import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieResponseDto } from 'modules/movies/dto/response';

export class FindAllResponseDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  userId: string;

  @ApiPropertyOptional()
  movieId: string;

  @ApiPropertyOptional()
  episodeId: string;

  @ApiPropertyOptional()
  duration: number;

  @ApiPropertyOptional()
  progress: number;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;

  @ApiPropertyOptional({ type: [MovieResponseDto] })
  movies: Omit<MovieResponseDto, 'category'>;
}

import { ApiSuccessResponse } from '@decorators';
import {
  BaseFindDto,
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  SearchDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
  FetchMovieDto,
  UpdateEpisodeDto,
  UpdateMovieDto,
  UpdateSeasonDto,
} from './dto/request';
import { GetMovieTitleIdResponseDto } from './dto/response';
import { MovieService } from './movies.service';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Movie successfully created' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post()
  createMovie(@Body() payload: CreateMovieDto) {
    return this.movieService.createMovie(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Episode successfully created' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('episode')
  createEpisode(@Body() payload: CreateEpisodeDto) {
    return this.movieService.createEpisode(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Season successfully created' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('season')
  createSeason(@Body() payload: CreateSeasonDto) {
    return this.movieService.createSeason(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(GetMovieTitleIdResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get('/data')
  getMovies(@Query() query: SearchDto) {
    return this.movieService.getMovies(query.search);
  }
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(GetMovieTitleIdResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get('/season/:movieId')
  getSeasons(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Query() query: BaseFindDto,
  ) {
    return this.movieService.getSeasons(movieId, query);
  }

  @HttpCode(HttpStatus.OK)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get('/episode/:seasonId')
  getEpisodes(
    @Param('seasonId', ParseUUIDPipe) seasonId: string,
    @Query() query: BaseFindDto,
  ) {
    return this.movieService.getEpisodes(seasonId, query);
  }

  @HttpCode(HttpStatus.OK)
  // @ApiSuccessResponse({})
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get()
  findAll(@Query() query: FetchMovieDto) {
    return this.movieService.findAll(query);
  }

  @HttpCode(HttpStatus.OK)
  // @ApiSuccessResponse({})
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Movie successfully updated' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Patch('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.movieService.update(id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Episode successfully updated' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Patch('/episode/:episodeId')
  updateEpisode(
    @Param('episodeId', ParseUUIDPipe) episodeId: string,
    @Body() payload: UpdateEpisodeDto,
  ) {
    return this.movieService.updateEpisode(episodeId, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Season successfully updated' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Patch('/season/:seasonId')
  updateSeason(
    @Param('seasonId') seasonId: string,
    @Body() payload: UpdateSeasonDto,
  ) {
    return this.movieService.updateSeason(seasonId, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Movie successfully deleted' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Episode successfully deleted' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Delete('/episode/:episodeId')
  deleteEpisode(@Param('episodeId', ParseUUIDPipe) episodeId: string) {
    return this.movieService.deleteEpisode(episodeId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse({ description: 'Season successfully deleted' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Delete('/season/:seasonId')
  deleteSeason(@Param('seasonId', ParseUUIDPipe) seasonId: string) {
    return this.movieService.deleteSeason(seasonId);
  }
}

import { ApiSuccessResponse, Public, Roles } from '@decorators';
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
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RoleTypes } from '@prisma/client';
import { Request, Response } from 'express';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
  FetchMovieDto,
  FindById,
  FindRecommendedsDto,
  UpdateEpisodeDto,
  UpdateMovieDto,
  UpdateSeasonDto,
} from './dto/request';
import {
  GetMovieTitleIdResponseDto,
  MainMoviesTvSeriesCartoonsResponseDto,
  MovieResponseDto,
} from './dto/response';
import { MovieService } from './movies.service';

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(MovieResponseDto, true)
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
  @Get('/recommendeds')
  getRecommendends(@Query() query: FindRecommendedsDto) {
    return this.movieService.getRecomendeds(query);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(MainMoviesTvSeriesCartoonsResponseDto)
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
  @Get('/main')
  getMoviesTvSeriesCartoons() {
    return this.movieService.getMainMoviesTvSeriesCartoons();
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Stream video file',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('video/mp4')
  @ApiNotFoundResponse({
    description: 'Media not found',
    schema: {},
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Get('/stream/:filename')
  streamMedia(
    @Param('filename') filename: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.movieService.streamMedia(filename, req, res);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(MovieResponseDto, true)
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(MovieResponseDto)
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
  findOne(@Param('id', ParseUUIDPipe) id: string, @Query() query: FindById) {
    return this.movieService.findOne(id, query);
  }

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

  @ApiBearerAuth()
  @Roles(RoleTypes.ADMIN)
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

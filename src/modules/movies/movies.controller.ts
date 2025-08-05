import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  CreateEpisodeDto,
  CreateMovieDto,
  CreateSeasonDto,
} from './dto/request';
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

  @Get()
  findAll() {}

  @Get('/:id')
  findOne() {}

  @Patch('/:id')
  update() {}

  @Patch('/:episodeId')
  updateEpisode() {}

  @Patch('/:seasonId')
  updateSeason() {}

  @Delete('/:id')
  delete() {}

  @Delete('/:episodeId')
  deleteEpisode() {}

  @Delete('/:seasonId')
  deleteSeason() {}
}

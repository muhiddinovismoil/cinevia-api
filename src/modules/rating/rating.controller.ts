import { ApiSuccessResponse, CurrentUser } from '@decorators';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Body,
  Controller,
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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import {
  CreateRatingDto,
  FindRatingsDto,
  UpdateRatingDto,
} from './dto/request';
import { FindRatingsResponseDto } from './dto/response';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(FindRatingsResponseDto, true)
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
  @Get('/:movieId')
  getRatingOfMovie(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Query() query: FindRatingsDto,
  ) {
    return this.ratingService.getRatingOfMovie(movieId, query);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Rating successfully created' })
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
  create(@CurrentUser() user: ICurrentUser, @Body() payload: CreateRatingDto) {
    return this.ratingService.create(user.id, { ...payload });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Rating successfully updated' })
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
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() payload: UpdateRatingDto,
  ) {
    return this.ratingService.update(id,user.id, { ...payload });
  }
}

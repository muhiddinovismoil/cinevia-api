import { CurrentUser } from '@decorators';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { CreateFavouriteDto } from './dto/request';
import { FavouriteService } from './favorite.service';

@ApiBearerAuth()
@ApiTags('Favourite')
@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Setted to favourite',
  })
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
  create(
    @CurrentUser() user: ICurrentUser,
    @Body() payload: CreateFavouriteDto,
  ) {
    return this.favouriteService.create(user.id, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Removed from favourite',
  })
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
  @Delete('/:movieId')
  delete(
    @CurrentUser() user: ICurrentUser,
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ) {
    return this.favouriteService.removeFromFavourite(user.id, movieId);
  }
}

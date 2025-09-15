import { ApiSuccessResponse, CurrentUser } from '@decorators';
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
  Param,
  ParseUUIDPipe,
  Post,
  Query,
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

import { CreateFavouriteDto, FindAllQueryDto } from './dto/request';
import { FindAllResponseDto } from './dto/response';
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

  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(FindAllResponseDto, true)
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
  findAll(@CurrentUser() user: ICurrentUser, @Query() query: FindAllQueryDto) {
    return this.favouriteService.findAllFavourites(user.id, query);
  }
}

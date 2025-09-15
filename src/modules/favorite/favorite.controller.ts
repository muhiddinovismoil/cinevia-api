import { CurrentUser } from '@decorators';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { CreateFavouriteDto } from './dto/request';
import { FavouriteService } from './favorite.service';

@ApiBearerAuth()
@ApiTags('Favourite')
@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @CurrentUser() user: ICurrentUser,
    @Body() payload: CreateFavouriteDto,
  ) {
    return this.favouriteService.create(user.id, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:movieId')
  delete(
    @CurrentUser() user: ICurrentUser,
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ) {
    return this.favouriteService.removeFromFavourite(user.id, movieId);
  }
}

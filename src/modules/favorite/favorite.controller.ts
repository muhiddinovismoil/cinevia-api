import { CurrentUser } from '@decorators';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { CreateFavouriteDto } from './dto/request';
import { FavouriteService } from './favorite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post()
  create(
    @CurrentUser() user: ICurrentUser,
    @Body() payload: CreateFavouriteDto,
  ) {
    return this.favouriteService.create(user.id, payload);
  }

  @Delete('/:movieId')
  delete(@CurrentUser() user: ICurrentUser, @Param('movieId') movieId: string) {
    return this.favouriteService.removeFromFavourite(user.id, movieId);
  }
}

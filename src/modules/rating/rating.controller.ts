import { CurrentUser } from '@decorators';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { CreateRatingDto, UpdateRatingDto } from './dto/request';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@CurrentUser() user: ICurrentUser, @Body() payload: CreateRatingDto) {
    return this.ratingService.create({ ...payload, userId: user.id });
  }

  @Patch('/update')
  update(@CurrentUser() user: ICurrentUser, @Body() payload: UpdateRatingDto) {
    return this.ratingService.update({ ...payload, userId: user.id });
  }
}

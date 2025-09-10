import { Injectable } from '@nestjs/common';

import { CreateRatingDto, UpdateRatingDto } from './dto/request';

@Injectable()
export class RatingService {
  create(createRatingDto: CreateRatingDto) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all s`;
  }

  findOne(id: number) {
    return `This action returns a #id `;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #id `;
  }

  remove(id: number) {
    return `This action removes a #id `;
  }
}

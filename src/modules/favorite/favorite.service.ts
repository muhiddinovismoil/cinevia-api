import { Injectable } from '@nestjs/common';

import { CreateFavouriteDto, UpdateFavouriteDto } from './dto/request';

@Injectable()
export class FavouriteService {
  create(createFavouriteDto: CreateFavouriteDto) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all s`;
  }

  findOne(id: number) {
    return `This action returns a #id `;
  }

  update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    return `This action updates a #id `;
  }

  remove(id: number) {
    return `This action removes a #id `;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  create() {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all s`;
  }

  findOne() {
    return `This action returns a #id `;
  }

  update() {
    return `This action updates a #id `;
  }

  remove() {
    return `This action removes a #id `;
  }
}

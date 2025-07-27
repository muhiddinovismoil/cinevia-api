import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create() {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all s`;
  }

  findOne(id: string) {
    return `This action returns a #id `;
  }

  update(id: string) {
    return `This action updates a #id `;
  }

  remove(id: string) {
    return `This action removes a #id `;
  }
}

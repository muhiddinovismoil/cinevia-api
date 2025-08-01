import { Controller, Get, Patch, Post } from '@nestjs/common';

import { CategoryService } from './categories.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async createCategory() {
    return await this.categoryService.create();
  }

  @Get()
  async getAllCategories() {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async getCategoryById() {
    return await this.categoryService.findOne();
  }

  @Patch('/:id')
  async updateCategoryById() {
    return await this.categoryService.update();
  }
}

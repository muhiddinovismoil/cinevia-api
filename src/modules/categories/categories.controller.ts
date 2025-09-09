import { ApiSuccessResponse, Public, Roles } from '@decorators';
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
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RoleTypes } from '@prisma/client';

import { CategoryService } from './categories.service';
import { CreateCategoryDto, FindAllDto } from './dto/request';
import { GetAllCategoryResponseDto } from './dto/response';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(RoleTypes.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Category created successfully' })
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
  async createCategory(@Body() payload: CreateCategoryDto) {
    return await this.categoryService.create(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(GetAllCategoryResponseDto, true)
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
  async getAllCategories(@Query() query: FindAllDto) {
    return await this.categoryService.findAll(query);
  }

  @Roles(RoleTypes.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Category updated successfully' })
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
  @Patch('/:id')
  async updateCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: CreateCategoryDto,
  ) {
    return await this.categoryService.update(id, payload);
  }

  @Roles(RoleTypes.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Category updated successfully' })
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
  @Delete('/:id')
  async removeCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.categoryService.removeCategory(id);
  }
}

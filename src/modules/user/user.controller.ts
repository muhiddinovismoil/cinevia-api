import { ApiSuccessResponse, CurrentUser } from '@decorators';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { GetProfileResponseDto } from './dto/response';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create() {}

  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(GetProfileResponseDto)
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
  @Get('me')
  async getProfile(@CurrentUser() user: ICurrentUser) {
    return await this.userService.findOne(user.id);
  }

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}

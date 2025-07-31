import { ApiSuccessResponse, CurrentUser } from '@decorators';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { UpdateProfileDto } from './dto/request';
import { GetProfileResponseDto } from './dto/response';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @Patch('update/profile')
  async updateProfile(
    @CurrentUser() user: ICurrentUser,
    @Body() payload: UpdateProfileDto,
  ) {
    return await this.userService.updateProfile(user.id, payload);
  }
}

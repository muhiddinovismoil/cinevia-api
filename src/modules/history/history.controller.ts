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
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { FindAllHistoryDto, UpsertHistoryDto } from './dto/request';
import { FindAllResponseDto } from './dto/response';
import { HistoryService } from './history.service';

@ApiTags('History')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  upsert(@CurrentUser() user: ICurrentUser, @Body() payload: UpsertHistoryDto) {
    return this.historyService.upsert(user.id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(FindAllResponseDto, true)
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
  watchHistoryForSlide(
    @CurrentUser() user: ICurrentUser,
    @Query() query: FindAllHistoryDto,
  ) {
    return this.historyService.findAll(user.id, query);
  }
}

import { ApiSuccessResponse, Roles } from '@decorators';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RoleTypes } from '@prisma/client';
import { Express } from 'express';

import { FileUploadBody } from './dto/request';
import { FileUploadResponse } from './dto/response';
import { FileService } from './file.service';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Roles(RoleTypes.ADMIN, RoleTypes.USER)
  @ApiSuccessResponse(FileUploadResponse)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploadBody)
  @Post('upload/photo')
  @UseInterceptors(FileInterceptor('file', FileService.photoUploadOptions()))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadPhoto(file);
  }

  @Roles(RoleTypes.ADMIN)
  @ApiSuccessResponse(FileUploadResponse)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploadBody)
  @Post('upload/media')
  @UseInterceptors(FileInterceptor('file', FileService.mediaUploadOptions()))
  async uploadMedia(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadMedia(file);
  }
}

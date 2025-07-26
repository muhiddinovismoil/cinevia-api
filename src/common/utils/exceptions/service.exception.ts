import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseResponse } from 'common/dtos';

export class ServiceExceptions {
  static handle(
    error: any,
    serviceName: string,
    methodName: string,
  ): BaseResponse<null> {
    const logger = new Logger(ServiceExceptions.name);
    logger.error(
      `❌ Service: [${serviceName}], method: [${methodName}], Error: ${error.message || error}`,
    );

    if (error instanceof HttpException) {
      throw error;
    }

    throw new InternalServerErrorException('Something went wrong');
  }
}

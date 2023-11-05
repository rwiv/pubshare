import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '@/misc/error/types';

@Catch(Error)
export class ConvertExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody: ErrorResponse = {
      status,
      message: exception.message,
      uuid: 'uuid',
      timestamp: new Date().toISOString(),
      code: 'JS_ERROR',
    };
    response.status(status).json(responseBody);
  }
}

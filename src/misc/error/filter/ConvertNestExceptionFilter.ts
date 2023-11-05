import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '@/misc/error/types';

@Catch(Error)
export class ConvertNestExceptionFilter
  implements ExceptionFilter<HttpException>
{
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const responseBody: ErrorResponse = {
      status,
      message: exception.message,
      uuid: 'uuid',
      timestamp: new Date().toISOString(),
      code: 'NESTJS_ERROR',
    };
    response.status(status).json(responseBody);
  }
}
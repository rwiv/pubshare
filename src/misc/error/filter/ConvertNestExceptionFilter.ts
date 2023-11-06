import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
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

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    try {
      status = exception.getStatus();
    } catch (e) {}

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

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebException } from '@/misc/error/exception/WebException';

@Catch(WebException)
export class WebExceptionFilter implements ExceptionFilter<WebException> {
  catch(exception: WebException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.getStatus()).json(exception.toResponse());
  }
}

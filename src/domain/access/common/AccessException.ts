import { HttpStatus } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class AccessException extends WebException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.BAD_REQUEST, 'ACCESS_ERROR', options);
  }
}

import { HttpStatus } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class AuthorizationException extends WebException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.UNAUTHORIZED, 'AUTHORIZATION_ERROR', options);
  }
}

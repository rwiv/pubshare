import { HttpStatus } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class AuthenticationException extends WebException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.FORBIDDEN, 'AUTHENTICATION_ERROR', options);
  }
}

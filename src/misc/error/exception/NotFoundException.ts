import { HttpStatus } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class NotFoundException extends WebException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND_ERROR', options);
  }
}

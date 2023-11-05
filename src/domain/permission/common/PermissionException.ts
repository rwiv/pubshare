import { HttpStatus } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';

export class PermissionException extends WebException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.UNAUTHORIZED, 'PERMISSION_ERROR', options);
  }
}

import { ErrorResponse } from '@/misc/error/types';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';
import { HttpException, HttpStatus } from '@nestjs/common';

export class WebException extends HttpException {
  readonly timestamp: Date;
  readonly code: string;
  static defaultCode = 'HTTP_ERROR';

  constructor(
    message: string,
    status: number = HttpStatus.BAD_REQUEST,
    code: string = WebException.defaultCode,
    options?: HttpExceptionOptions,
  ) {
    super(message, status, options);
    this.timestamp = new Date();
    this.code = code;
  }

  toResponse(): ErrorResponse {
    return {
      status: super.getStatus(),
      message: this.message,
      uuid: 'uuid',
      timestamp: this.timestamp.toISOString(),
      code: this.code,
    };
  }
}

export interface HttpErrorResponse {
  status: number,
  message: string,
  uuid: string,
  timestamp: string,
  code: string,
}

export class HttpError extends Error {

  readonly status: number;
  readonly message: string;
  readonly uuid: string;
  readonly timestamp: string;
  readonly code: string;

  constructor(error: HttpErrorResponse) {
    super(error.message);

    this.status = error.status;
    this.message = error.message;
    this.uuid = error.uuid;
    this.timestamp = error.timestamp;
    this.code = error.code;
  }
}
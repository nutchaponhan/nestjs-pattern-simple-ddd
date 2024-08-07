import { ErrorBase } from '@core/error/error.base';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends ErrorBase<HttpStatus.BAD_REQUEST> {
  code = HttpStatus.BAD_REQUEST;

  constructor(message = 'user not found') {
    super(message);
  }
}

export class InvalidCredentialsError extends ErrorBase<HttpStatus.BAD_REQUEST> {
  code = HttpStatus.BAD_REQUEST;

  constructor(message = 'email/password is incorrect') {
    super(message);
  }
}

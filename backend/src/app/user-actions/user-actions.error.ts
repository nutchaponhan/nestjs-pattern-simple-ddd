import { ErrorBase } from '@core/error/error.base';
import { HttpStatus } from '@nestjs/common';

export class UserActionNotFoundError extends ErrorBase<HttpStatus.NOT_FOUND> {
  public code = HttpStatus.NOT_FOUND;

  constructor(message = 'User action not found') {
    super(message);
  }
}

import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from './error.base';

export class EntityValidationError extends ErrorBase<HttpStatus.BAD_REQUEST> {
  public code = HttpStatus.BAD_REQUEST;

  constructor(message = 'entity validation fail') {
    super(message);
  }
}

export class UnableToSaveError extends ErrorBase<HttpStatus.INTERNAL_SERVER_ERROR> {
  public code = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(message = 'Unable to save to DB') {
    super(message);
  }
}

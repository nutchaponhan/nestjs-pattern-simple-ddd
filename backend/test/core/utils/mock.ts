import {
  EntityValidationError,
  UnableToSaveError,
} from '@core/error/entity-validate.error';
import { faker } from '@faker-js/faker';
import { set } from 'lodash';
import { Err } from 'oxide.ts';

export const MOCK_SAVE = async (obj: { id: number | null }) => {
  if (!obj.id) {
    set(obj, 'id', faker.number.int({ max: 100 }));
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MOCK_SAVE_ERR = async (obj) => {
  return Err(new UnableToSaveError());
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MOCK_SAVE_ERR_VALIDATION = async (obj) => {
  return Err(new EntityValidationError());
};

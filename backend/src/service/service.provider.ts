import { Logger, Provider } from '@nestjs/common';
import { LOGGERS_SERVICE } from './loggers/loggers.di-tokens';

export const SERVICE_PROVIDER: Array<Provider> = [
  {
    provide: LOGGERS_SERVICE,
    useClass: Logger,
  },
];

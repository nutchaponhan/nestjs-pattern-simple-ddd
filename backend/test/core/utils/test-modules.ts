import { Test } from '@nestjs/testing';
import { Logger, Provider, Type, ValueProvider } from '@nestjs/common';
import { DRIZZLE_ORM } from '@core/constants/db.constants';
import { TestDrizzleService } from './test-drizzle.service';
import { LOGGERS_SERVICE } from '@service/loggers/loggers.di-tokens';
import { EventEmitter2 } from '@nestjs/event-emitter';

const mockEventEmitter = {
  emitAsync: jest.fn().mockResolvedValue(null),
};
export async function createDrizzleRepoTestingModule(repoProvider: Provider) {
  return Test.createTestingModule({
    imports: [],
    providers: [
      repoProvider,
      TestDrizzleService,
      {
        provide: LOGGERS_SERVICE,
        useClass: Logger,
      },
      {
        provide: EventEmitter2,
        useValue: mockEventEmitter,
      },
      {
        provide: DRIZZLE_ORM,
        useFactory: async (drizzleService: TestDrizzleService) => {
          const db = await drizzleService.getDrizzle();

          // Run migrate before each test
          await drizzleService.migrate();

          // Clean db before each test
          await drizzleService.cleanDb();

          return db;
        },
        inject: [TestDrizzleService],
      },
    ],
  }).compile();
}

export async function createMockTestingModule(
  serviceProvider: Provider,
  mockProviders: Array<ValueProvider>,
) {
  return Test.createTestingModule({
    providers: [serviceProvider, ...mockProviders],
  }).compile();
}

export async function createControllerTestingModule(
  controller: Type<any>,
  mockProviders: Array<ValueProvider>,
) {
  const module = await Test.createTestingModule({
    controllers: [controller],
    providers: mockProviders,
  }).compile();

  const nestApp = module.createNestApplication();
  await nestApp.init();

  return { module, nestApp };
}

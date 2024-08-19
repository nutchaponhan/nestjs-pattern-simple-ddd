import { DynamicModule, Module } from '@nestjs/common';

import { DrizzleModule } from './dizzle/drizzle.module';

interface DatabaseOptions {
  type: 'drizzle';
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static async register({
    type = 'drizzle',
    global = false,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: PersistenceModule,
      imports: [type === 'drizzle' && DrizzleModule],
      exports: [type === 'drizzle' && DrizzleModule],
    };
  }
}

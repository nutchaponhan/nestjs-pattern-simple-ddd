import { DynamicModule, Module } from '@nestjs/common';

import { DrizzleModule } from '../persistence/dizzle/dizzle.module';

interface DatabaseOptions {
  type: 'prisma' | 'mongoose';
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static async register({
    global = false,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: PersistenceModule,
      imports: [DrizzleModule],
      exports: [DrizzleModule],
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserManagementModule } from './app/user-management/user-management.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
  imports: [
    // configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // infra
    PersistenceModule.register({ type: 'drizzle', global: true }),

    // app domain
    UserManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

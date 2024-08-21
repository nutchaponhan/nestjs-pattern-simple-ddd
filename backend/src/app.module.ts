import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PersistenceModule } from './infra/persistence/persistence.module';
import { AppController } from './infra/http/app.controller';
import { UserManagementModule } from './app/user-management/user-management.module';
import { ProductInHouseModule } from './app/product-in-house/product-in-house.module';

@Module({
  imports: [
    // configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // infra
    PersistenceModule.register({ type: 'drizzle', global: true }),

    // app domain
    UserManagementModule,
    ProductInHouseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

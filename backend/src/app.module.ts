import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './core/config/app-config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './core/application/interceptor/context-interceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { ServiceModule } from './service/service.module';
import { UsersModule } from './app/users/users.module';
import { NestDrizzleModule } from './drizzle/drizzle.module';
import { RepoModule } from './repo/repo.module';
import * as schema from '@drizzle/schema';
import { AuthsModule } from '@app/auths/auths.module';
import { UserActionsModule } from '@app/user-actions/user-actions.module';

const interceptor: Array<Provider> = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

@Module({
  imports: [
    AuthsModule,
    UserActionsModule,
    RequestContextModule,
    RepoModule,
    ServiceModule,
    EventEmitterModule.forRoot(),
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: 'postgresql',
          url: appConfig.dbConfigUrl,
          options: { schema },
          migrationOptions: { migrationsFolder: './migration' },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...interceptor],
})
export class AppModule {}

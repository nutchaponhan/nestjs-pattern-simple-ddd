import { Module, Provider } from '@nestjs/common';
import { AuthsHttpController } from './controller/http/auths.http.controller';
import { AuthsUseCase } from './usecase/auths.usecase';
import appConfig from '@core/config/app-config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt/jwt.guard';
import { JwtStrategy } from './guard/jwt/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';

const guards: ReadonlyArray<Provider> = [
  JwtAuthGuard,
  JwtStrategy,
  {
    provide: APP_GUARD,
    useExisting: JwtAuthGuard,
  },
];

@Module({
  imports: [JwtModule.register(appConfig.jwtConfig)],
  controllers: [AuthsHttpController],
  providers: [...guards, AuthsUseCase],
})
export class AuthsModule {}

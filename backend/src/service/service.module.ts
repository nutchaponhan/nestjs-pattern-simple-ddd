import { Global, Module } from '@nestjs/common';
import { SERVICE_PROVIDER } from './service.provider';

@Global()
@Module({
  providers: SERVICE_PROVIDER,
  exports: SERVICE_PROVIDER,
})
export class ServiceModule {}

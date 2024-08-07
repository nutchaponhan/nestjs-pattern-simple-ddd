import { Module, Provider } from '@nestjs/common';
import { UsersHttpController } from './controller/http/users.http.controller';
import { UsersUsecase } from './usecase/users.usecase';
import { LogSomethingWhenUserCreatedDomainEventHandler } from './event-handler/log-something-when-user-create.domain-event-handler';

const eventHandlers: ReadonlyArray<Provider> = [
  LogSomethingWhenUserCreatedDomainEventHandler,
];

@Module({
  controllers: [UsersHttpController],
  providers: [UsersUsecase, ...eventHandlers],
  exports: [],
})
export class UsersModule {}

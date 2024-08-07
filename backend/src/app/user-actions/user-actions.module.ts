import { Module, Provider } from '@nestjs/common';
import { LogWhenUserActionDomainEventHandler } from './event-handler/log-when-user-action.domain-event-handler';

const eventHandlers: ReadonlyArray<Provider> = [
  LogWhenUserActionDomainEventHandler,
];

@Module({
  controllers: [],
  providers: [...eventHandlers],
  exports: [],
})
export class UserActionsModule {}

import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_ACTIONS_REPO } from '@repo/user_actions/user-actions.repo.di-tokens';
import { UsersActionsRepo } from '@repo/user_actions/user-actions.repo';
import { UserPerformActionDomainEvent } from '@app/users/domain/event/user-perform-action.domain.event';
import { UserActionsEntity } from '../domain/user-actions.entity';

@Injectable()
export class LogWhenUserActionDomainEventHandler {
  constructor(
    @Inject(USER_ACTIONS_REPO) private readonly repo: UsersActionsRepo,
  ) {}

  @OnEvent(UserPerformActionDomainEvent.name, { async: true, promisify: true })
  async handle(event: UserPerformActionDomainEvent): Promise<any> {
    const createUserAction = UserActionsEntity.create({
      action: event.action,
      userId: event.userId,
    });
    this.repo.save(createUserAction);
  }
}

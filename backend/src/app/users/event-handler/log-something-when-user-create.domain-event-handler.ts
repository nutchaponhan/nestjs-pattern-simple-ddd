import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedDomainEvent } from '../domain/event/user-created.domain-event';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';
import { UsersRepo } from '@repo/users/users.repo';

@Injectable()
export class LogSomethingWhenUserCreatedDomainEventHandler {
  constructor(@Inject(USERS_REPO) private readonly repo: UsersRepo) {}

  @OnEvent(UserCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: UserCreatedDomainEvent): Promise<any> {
    console.log('==================================');
    console.log(event);
    console.log('==================================');
  }
}

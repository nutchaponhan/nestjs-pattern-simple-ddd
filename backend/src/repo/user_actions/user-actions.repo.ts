import { Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { RepoBase } from '../repo.base';
import { $UserActions } from '@drizzle/schema';
import { UserActionsEntity } from '@app/user-actions/domain/user-actions.entity';
import { UserActionNotFoundError } from '@app/user-actions/user-actions.error';

@Injectable()
export class UsersActionsRepo extends RepoBase<
  UserActionsEntity,
  typeof $UserActions
> {
  async getInstance(
    id: number,
  ): Promise<Result<UserActionsEntity, UserActionNotFoundError>> {
    const res = await this.selectById(id);
    if (res.isErr()) {
      return Err(new UserActionNotFoundError());
    }

    const userAction = res.unwrap();
    return Ok(
      new UserActionsEntity({
        id: userAction.id,
        createdAt: userAction.createdAt,
        props: {
          action: userAction.action,
          userId: userAction.userId || null,
        },
      }),
    );
  }

  get _table() {
    return $UserActions;
  }
}

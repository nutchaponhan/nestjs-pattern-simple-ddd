import { EventEntity } from '@core/ddd/event-entity.base';
import { UserActionEntityProps } from './user-actions.entity.type';
import { $InsertUserActions } from '@drizzle/schema.type';

export class UserActionsEntity extends EventEntity<UserActionEntityProps> {
  public validate() {
    return null;
  }

  static create(props: UserActionEntityProps): UserActionsEntity {
    const userAction = new UserActionsEntity({ props });
    return userAction;
  }

  public toDbValues(): $InsertUserActions {
    const props = this.getProps();
    return {
      action: props.action,
      userId: props.userId,
    };
  }
}

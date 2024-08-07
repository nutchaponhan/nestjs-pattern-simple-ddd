import { EventEntity } from '@core/ddd/event-entity.base';
import { UserEntityProps } from './user.entity.type';
import { $InsertUsers } from '@drizzle/schema.type';
import { comparePassword, encodePassword } from '@core/util/crypto';
import { Err } from 'oxide.ts';
import { InvalidCredentialsError } from '../users.error';
import { today } from '@core/util/dayjs';
import { UserPerformActionDomainEvent } from './event/user-perform-action.domain.event';
import { UserAction } from '@app/user-actions/user-actions.constant';

export class UserEntity extends EventEntity<UserEntityProps> {
  public validate() {
    return null;
  }

  static create(createData: UserEntityProps): UserEntity {
    const props = createData;
    props.password = encodePassword(props.password);

    const user = new UserEntity({ props });
    // user.addEvent(
    //   new UserCreatedDomainEvent({
    //     aggregateId: user.aggregateId,
    //     name: props.name,
    //   }),
    // );
    return user;
  }

  toDbValues(): $InsertUsers {
    const props = this.getProps();
    return {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
      updatedAt: today(),
      lastSignInAt: props.lastSignInAt,
    };
  }

  changePassword(rawPassword: string) {
    this.props.password = encodePassword(rawPassword);
    return this;
  }

  signIn() {
    this.addEvent(
      new UserPerformActionDomainEvent({
        userId: this.id,
        action: UserAction.SignIn,
        aggregateId: this.aggregateId,
      }),
    );
    this.props.lastSignInAt = today();
    return this;
  }

  checkPassword(rawPassword: string): Err<InvalidCredentialsError> {
    const props = this.getProps();
    const valid = comparePassword(rawPassword, props.password);
    if (!valid) {
      return Err(new InvalidCredentialsError());
    }
  }
}

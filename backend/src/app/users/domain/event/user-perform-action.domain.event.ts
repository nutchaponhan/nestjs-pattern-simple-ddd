import { DomainEvent, DomainEventProps } from '@core/ddd/domain-event.base';

export class UserPerformActionDomainEvent extends DomainEvent {
  readonly userId: number;
  readonly action: string;

  constructor(props: DomainEventProps<UserPerformActionDomainEvent>) {
    super(props);
    this.action = props.action;
    this.userId = props.userId;
  }
}

import { Entity } from '../../core/entity/entity';
import { User } from '../user-management/user';

import { OrderProduct } from './order-product';

export interface OrderProps {
  id?: number;
  status?: string;
  userId?: number;
  user?: User;
  orderProducts?: OrderProduct[];
}

export class Order extends Entity<OrderProps> {
  constructor(props: OrderProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get status(): string {
    return this.props.status;
  }

  get userId(): number {
    return this.props.userId;
  }

  get orderProducts(): OrderProduct[] {
    return this.props.orderProducts;
  }

  get user(): User {
    return this.props.user;
  }

  get currentState(): OrderProps {
    return this.props;
  }
}

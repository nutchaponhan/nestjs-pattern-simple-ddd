import { Entity } from '../../core/entity/entity';

import { OrderProduct } from './order-product';

export interface OrderProps {
  id?: number;
  status?: 'paid' | 'open' | 'canceled';
  userId: number;
  orderProduct?: OrderProduct[];
}

export class Order extends Entity<OrderProps> {
  constructor(props: OrderProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get status(): 'paid' | 'open' | 'canceled' {
    return this.props.status;
  }

  get userId(): number {
    return this.props.userId;
  }

  get orderProduct(): OrderProduct[] {
    return this.props.orderProduct;
  }

  get currentState(): OrderProps {
    return this.props;
  }
}

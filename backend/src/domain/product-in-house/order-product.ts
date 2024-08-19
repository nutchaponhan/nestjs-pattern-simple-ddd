import { Entity } from '../../core/entity/entity';

export interface OrderProductProps {
  id?: number;
  orderId?: number;
  productId?: number;
  price: number;
}

export class OrderProduct extends Entity<OrderProductProps> {
  constructor(props: OrderProductProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get orderId(): number {
    return this.props.orderId;
  }

  get productId(): number {
    return this.props.productId;
  }

  get price(): number {
    return this.props.price;
  }

  get currentState(): OrderProductProps {
    return this.props;
  }
}

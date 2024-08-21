import { Entity } from '../../core/entity/entity';
import { Order } from './order';
import { Product } from './product';

export interface OrderProductProps {
  id?: number;
  orderId?: number;
  productId?: number;
  price?: number;

  order?: Order;
  product?: Product;
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

  get order(): Order {
    return this.props.order;
  }

  get product(): Product {
    return this.props.product;
  }

  get currentState(): OrderProductProps {
    return this.props;
  }
}

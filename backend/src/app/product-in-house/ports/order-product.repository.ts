import { OrderProduct } from '../../../domain/product-in-house/order-product';

export abstract class OrderProductRepository {
  abstract create(orderProduct: OrderProduct[]): Promise<OrderProduct[]>;
}

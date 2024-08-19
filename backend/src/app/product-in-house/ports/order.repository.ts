import { Order } from '../../../domain/product-in-house/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
}

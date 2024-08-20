import { $Order } from '../schema/orders.schema';

import { Order } from '../../../../domain/product-in-house/order';

export class DrizzleOrderMapper {
  static toDomain(entity: typeof $Order.$inferSelect): Order {
    const model = new Order({
      id: entity.id,
      status: entity.status,
      userId: entity.userId,
    });
    return model;
  }

  static toDrizzle(order: Order): typeof $Order.$inferInsert {
    return {
      id: order.id,
      status: order.status,
      userId: order.userId,
    };
  }
}

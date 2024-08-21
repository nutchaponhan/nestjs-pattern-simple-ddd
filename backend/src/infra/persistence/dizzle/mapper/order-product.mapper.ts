import { $OrderProduct } from '../schema/order-product.schema';

import { OrderProduct } from '../../../../domain/product-in-house/order-product';

export class DrizzleOrderProductMapper {
  static toDomain(entity: typeof $OrderProduct.$inferSelect): OrderProduct {
    const model = new OrderProduct({
      id: entity.id,
      orderId: entity.orderId,
      productId: entity.productId,
      price: entity.price,
    });
    return model;
  }

  static toDrizzle(
    orderProduct: OrderProduct,
  ): typeof $OrderProduct.$inferInsert {
    return {
      id: orderProduct.id,
      orderId: orderProduct.orderId,
      productId: orderProduct.productId,
      price: orderProduct.price,
    };
  }
}

import { $Order } from '../schema/orders.schema';
import { $OrderProduct } from '../schema/order-product.schema';
import { $User } from '../schema/users.schema';

import { Order } from '../../../../domain/product-in-house/order';
import { DrizzleUserMapper } from './user.mapper';
import { DrizzleOrderProductMapper } from './order-product.mapper';

type OrderSelect = typeof $Order.$inferSelect;
type OrderProductSelect = typeof $OrderProduct.$inferSelect;
type UserSelect = typeof $User.$inferSelect;

type OrderDetail = OrderSelect & { user: UserSelect } & {
  orderProducts: OrderProductSelect[];
};

export class DrizzleOrderDetailMapper {
  static toDomain(entity: OrderDetail): Order {
    const model = new Order({
      id: entity.id,
      status: entity.status,
      userId: entity.userId,
      user: DrizzleUserMapper.toDomain(entity.user),
      orderProducts: entity.orderProducts.map(
        DrizzleOrderProductMapper.toDomain,
      ),
    });
    return model;
  }
}

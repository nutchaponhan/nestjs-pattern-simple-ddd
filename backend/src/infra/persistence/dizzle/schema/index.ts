import { $OrderProduct } from './order-product.schema';
import { $Order } from './orders.schema';
import { $Product } from './product.schema';
import { $User } from './users.schema';

export const schema = {
  orderProduct: $OrderProduct,
  orders: $Order,
  products: $Product,
  users: $User,
};

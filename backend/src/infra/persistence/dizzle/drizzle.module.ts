import { Module } from '@nestjs/common';

import { UserRepository } from '../../../app/user-management/ports/user.repository';
import { OrderProductRepository } from '../../../app/product-in-house/ports/order-product.repository';
import { OrderRepository } from '../../../app/product-in-house/ports/order.repository';
import { ProductRepository } from '../../../app/product-in-house/ports/product.repository';

// Non exported
import { DrizzleService } from './drizzle.service';
import { DrizzleUserRepository } from './repository/user.repository';
import { DrizzleOrderProductRepository } from './repository/order-product.repository';
import { DrizzleOrderRepository } from './repository/order.repository';
import { DrizzleProductRepository } from './repository/product.repository';

@Module({
  imports: [],
  providers: [
    DrizzleService,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: OrderProductRepository,
      useClass: DrizzleOrderProductRepository,
    },
    {
      provide: OrderRepository,
      useClass: DrizzleOrderRepository,
    },
    {
      provide: ProductRepository,
      useClass: DrizzleProductRepository,
    },
  ],
  exports: [
    DrizzleService,
    UserRepository,
    OrderProductRepository,
    OrderRepository,
    ProductRepository,
  ],
})
export class DrizzleModule {}

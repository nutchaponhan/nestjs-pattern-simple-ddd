import { Injectable } from '@nestjs/common';

import { DrizzleService } from '../drizzle.service';
import { $OrderProduct } from '../schema/order-product.schema';
import { DrizzleOrderProductMapper } from '../mapper/order-product.mapper';

import { OrderProductRepository } from '../../../../app/product-in-house/ports/order-product.repository';
import { OrderProduct } from '../../../../domain/product-in-house/order-product';

@Injectable()
export class DrizzleOrderProductRepository implements OrderProductRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(orderProduct: OrderProduct[]): Promise<OrderProduct[]> {
    const data = orderProduct.map(DrizzleOrderProductMapper.toDrizzle);
    const db = await this.drizzle.getDrizzle();
    const newOrderProducts = await db
      .insert($OrderProduct)
      .values(data)
      .returning();
    return newOrderProducts.map(DrizzleOrderProductMapper.toDomain);
  }
}

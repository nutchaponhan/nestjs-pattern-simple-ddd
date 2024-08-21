import { Injectable } from '@nestjs/common';

import { DrizzleService } from '../drizzle.service';
import { $Order } from '../schema/orders.schema';
import { DrizzleOrderMapper } from '../mapper/order.mapper';

import { OrderRepository } from '../../../../app/product-in-house/ports/order.repository';
import { Order } from '../../../../domain/product-in-house/order';
import { eq } from 'drizzle-orm';
import { DrizzleOrderDetailMapper } from '../mapper/order-detail.mapper';

@Injectable()
export class DrizzleOrderRepository implements OrderRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(order: Order): Promise<Order> {
    const data = DrizzleOrderMapper.toDrizzle(order);
    const db = await this.drizzle.getDrizzle();
    const [newOrder] = await db.insert($Order).values(data).returning();
    return DrizzleOrderMapper.toDomain(newOrder);
  }

  async find({ id }: { id: number }): Promise<Order> {
    const db = await this.drizzle.getDrizzle();
    const order = await db.query.orders.findFirst({
      where: eq($Order.id, id),
      with: {
        user: true,
        orderProducts: true,
      },
    });
    return DrizzleOrderDetailMapper.toDomain(order);
  }
}

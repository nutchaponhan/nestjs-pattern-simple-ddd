import { Injectable } from '@nestjs/common';

import { DrizzleService } from '../drizzle.service';
import { $User } from '../schema';

import { OrderRepository } from '../../../../app/product-in-house/ports/order.repository';
import { Order } from '../../../../domain/product-in-house/order';
import { DrizzleUserMapper } from '../mapper/user.mapper';

@Injectable()
export class DrizzleOrderRepository implements OrderRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(order: Order): Promise<Order> {
    const data = DrizzleUserMapper.toDrizzle(user);
    const db = await this.drizzle.getDrizzle();
    const [newUser] = await db.insert($User).values(data).returning();
    return DrizzleUserMapper.toDomain(newUser);
  }
}

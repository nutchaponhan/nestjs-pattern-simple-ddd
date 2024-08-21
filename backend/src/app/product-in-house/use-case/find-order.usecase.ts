import { Injectable } from '@nestjs/common';

import { OrderRepository } from '../ports/order.repository';
import { Order } from '../../../domain/product-in-house/order';

interface FindOrderCommand {
  id: number;
}

@Injectable()
export class FindOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ id }: FindOrderCommand): Promise<Order> {
    const order = await this.orderRepository.find({ id });
    return order;
  }
}

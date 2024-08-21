import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../ports/product.repository';
import { OrderRepository } from '../ports/order.repository';
import { UserRepository } from '../../user-management/ports/user.repository';

import { Order } from '../../../domain/product-in-house/order';
import { OrderProduct } from '../../../domain/product-in-house/order-product';

interface CreateOrderUseCaseCommand {
  email: string;
  productId: number[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    createOrderUseCaseCommand: CreateOrderUseCaseCommand,
  ): Promise<{ id: number }> {
    const user = await this.userRepository.find({
      email: createOrderUseCaseCommand.email,
    });

    const products = await this.productRepository.findMany();

    const availableProduct = products.filter((p) => p.checkAvailable);

    const newOrderProduct = availableProduct.map((product) => {
      return new OrderProduct({
        productId: product.id,
        price: product.price,
      });
    });

    const order = new Order({
      userId: user.id,
      status: 'open',
      orderProducts: newOrderProduct,
    });

    const newOrder = await this.orderRepository.create(order);

    return { id: newOrder.id };
  }
}

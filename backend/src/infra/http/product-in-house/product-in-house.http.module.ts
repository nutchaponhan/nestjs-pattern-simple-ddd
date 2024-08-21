import { Module } from '@nestjs/common';

import { ProductInHouseController } from './controller/product-in-house.controller';

import { FindAllProductUseCase } from '../../../app/product-in-house/use-case/find-all-product.usecase';
import { CreateOrderUseCase } from '../../../app/product-in-house/use-case/create-order.usecase';
import { FindOrderUseCase } from '../../../app/product-in-house/use-case/find-order.usecase';

@Module({
  imports: [],
  controllers: [ProductInHouseController],
  providers: [FindAllProductUseCase, CreateOrderUseCase, FindOrderUseCase],
  exports: [],
})
export class ProductInHouseHttpModule {}

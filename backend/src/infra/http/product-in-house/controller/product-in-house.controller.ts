import { Controller, Post, Get, Body } from '@nestjs/common';

import { CreateOrderUseCase } from '../../../../app/product-in-house/use-case/create-order.usecase';
import { FindAllProductUseCase } from '../../../../app/product-in-house/use-case/find-all-product.usecase';

import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('/product')
export class ProductInHouseController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private findAllProductUseCase: FindAllProductUseCase,
  ) {}

  @Post('order')
  signUp(@Body() createOrderDto: CreateOrderDto) {
    const response = this.createOrderUseCase.execute(createOrderDto);
    return response;
  }

  @Get()
  getAllProducts() {
    const response = this.findAllProductUseCase.execute();
    return response;
  }
}

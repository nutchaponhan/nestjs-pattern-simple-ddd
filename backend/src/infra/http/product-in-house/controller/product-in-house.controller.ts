import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { CreateOrderUseCase } from '../../../../app/product-in-house/use-case/create-order.usecase';
import { FindAllProductUseCase } from '../../../../app/product-in-house/use-case/find-all-product.usecase';
import { FindOrderUseCase } from '../../../../app/product-in-house/use-case/find-order.usecase';

import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('/product')
export class ProductInHouseController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private findAllProductUseCase: FindAllProductUseCase,
    private findOrderUseCase: FindOrderUseCase,
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

  @Get('order/:id')
  getOrder(@Param('id') id: number) {
    const response = this.findOrderUseCase.execute({ id });
    return response;
  }
}

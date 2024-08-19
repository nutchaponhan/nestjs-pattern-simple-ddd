import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../ports/product.repository';
import { Product } from '../../../domain/product-in-house/product';

@Injectable()
export class FindAllProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findMany();
    return products;
  }
}

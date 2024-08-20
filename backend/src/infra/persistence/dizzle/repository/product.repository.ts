import { Injectable } from '@nestjs/common';

import { DrizzleService } from '../drizzle.service';
import { $Product } from '../schema/product.schema';
import { DrizzleProductMapper } from '../mapper/product.mapper';

import { ProductRepository } from '../../../../app/product-in-house/ports/product.repository';
import { Product } from '../../../../domain/product-in-house/product';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(private drizzle: DrizzleService) {}

  async findMany(): Promise<Product[]> {
    const db = await this.drizzle.getDrizzle();
    const products = await db.select().from($Product);
    return products.map(DrizzleProductMapper.toDomain);
  }
}

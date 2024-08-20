import { $Product } from '../schema/product.schema';

import { Product } from '../../../../domain/product-in-house/product';

export class DrizzleProductMapper {
  static toDomain(entity: typeof $Product.$inferSelect): Product {
    const model = new Product({
      id: entity.id,
      title: entity.title,
      price: entity.price,
      stock: entity.stock,
    });
    return model;
  }

  static toDrizzle(product: Product): typeof $Product.$inferInsert {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      stock: product.stock,
    };
  }
}

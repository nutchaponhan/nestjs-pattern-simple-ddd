import { Product } from '../../../domain/product-in-house/product';

export abstract class ProductRepository {
  abstract findMany({ id }: { id: number[] }): Promise<Product[]>;
}

import { Product } from '../../../domain/product-in-house/product';

export abstract class ProductRepository {
  abstract findMany(): Promise<Product[]>;
}

import { Entity } from '../../core/entity/entity';

export interface ProductProps {
  id?: number;
  title: string;
  price: number;
  stock: number;
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get checkAvailable(): boolean {
    return this.props.stock > 0;
  }
}

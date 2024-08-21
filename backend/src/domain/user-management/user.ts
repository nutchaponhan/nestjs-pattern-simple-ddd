import { Entity } from '../../core/entity/entity';
import { Order } from '../product-in-house/order';

export interface UserProps {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastSignInAt?: Date;

  orders: Order[];
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get lastSignInAt(): Date {
    return this.props.lastSignInAt;
  }

  get name(): string {
    return this.props.firstName + this.props.lastName;
  }

  get orders(): Order[] {
    return this.props.orders;
  }

  checkPassword(password: string): boolean {
    return password === this.props.password;
  }
}

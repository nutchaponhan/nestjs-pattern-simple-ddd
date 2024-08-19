import { User } from '../../../domain/user-management/user';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract find({ email }: { email: string }): Promise<User>;
}

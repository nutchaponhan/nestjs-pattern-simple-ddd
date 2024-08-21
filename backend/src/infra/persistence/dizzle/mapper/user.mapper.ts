import { $User } from '../schema';
import { User } from '../../../../domain/user-management/user';

export class DrizzleUserMapper {
  static toDomain(entity: typeof $User.$inferSelect): User {
    const model = new User({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      lastSignInAt: entity.lastSignInAt,
    });
    return model;
  }

  static toDrizzle(user: User): typeof $User.$inferInsert {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      updatedAt: new Date(),
      lastSignInAt: user.lastSignInAt,
    };
  }
}

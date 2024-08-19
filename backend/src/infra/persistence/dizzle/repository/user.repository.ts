import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleService } from '../drizzle.service';
import { $User } from '../schema';

import { UserRepository } from '../../../../app/user-management/ports/user.repository';
import { User } from '../../../../domain/user-management/user';
import { DrizzleUserMapper } from '../mapper/user.mapper';

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(private drizzle: DrizzleService) {}

  async find({ email }: { email: string }): Promise<User> {
    const db = await this.drizzle.getDrizzle();
    const [user] = await db.select().from($User).where(eq($User.email, email));
    return DrizzleUserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const data = DrizzleUserMapper.toDrizzle(user);
    const db = await this.drizzle.getDrizzle();
    const [newUser] = await db.insert($User).values(data).returning();
    return DrizzleUserMapper.toDomain(newUser);
  }
}

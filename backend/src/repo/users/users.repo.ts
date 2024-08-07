import { Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { RepoBase } from '../repo.base';
import { $Users } from '@drizzle/schema';
import { UsersRepoFindAll, UsersRepoFindOne } from './users.repo.type';
import { eq } from 'drizzle-orm';
import { UserEntity } from '@app/users/domain/users.entity';
import { UserNotFoundError } from '@app/users/users.error';

@Injectable()
export class UsersRepo extends RepoBase<UserEntity, typeof $Users> {
  async getInstance(
    id: number,
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const res = await this.selectById(id);
    if (res.isErr()) {
      return Err(new UserNotFoundError());
    }

    const user = res.unwrap();
    return Ok(
      new UserEntity({
        id: user.id,
        props: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          lastSignInAt: user.lastSignInAt,
        },
      }),
    );
  }

  async getInstanceByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const [user] = await this.db
      .select()
      .from($Users)
      .where(eq($Users.email, email));

    if (!user) {
      return Err(new UserNotFoundError());
    }

    return Ok(
      new UserEntity({
        id: user.id,
        props: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          lastSignInAt: user.lastSignInAt,
        },
      }),
    );
  }

  async findAll(): Promise<Result<UsersRepoFindAll, null>> {
    const data = await this.db
      .select({
        id: $Users.id,
        email: $Users.email,
      })
      .from($Users);

    return Ok(data);
  }

  async findOne(
    id: number,
  ): Promise<Result<UsersRepoFindOne, UserNotFoundError>> {
    const [user] = await this.db
      .select({
        id: $Users.id,
        email: $Users.email,
      })
      .from($Users)
      .where(eq($Users.id, id));

    if (!user) {
      return Err(new UserNotFoundError());
    }

    return Ok(user);
  }

  get _table() {
    return $Users;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UsersUsecaseFindAll, UsersUsecaseFindOne } from './users.usecase.type';
import { Result } from 'oxide.ts';
import { UserNotFoundError } from '../users.error';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';
import { UsersRepo } from '@repo/users/users.repo';

@Injectable()
export class UsersUsecase {
  constructor(@Inject(USERS_REPO) private readonly repo: UsersRepo) {}

  async findAll(): Promise<Result<UsersUsecaseFindAll, null>> {
    return this.repo.findAll();
  }

  async findOne(
    id: number,
  ): Promise<Result<UsersUsecaseFindOne, UserNotFoundError>> {
    return this.repo.findOne(id);
  }
}

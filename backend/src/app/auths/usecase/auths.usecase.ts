import { Inject, Injectable } from '@nestjs/common';
import { UsersRepo } from '@repo/users/users.repo';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';
import { AuthsSignIn, AuthsSignUp, AuthsTokenData } from './auths.usecase.type';
import { UserEntity } from '@app/users/domain/users.entity';
import { Err, Ok, Result } from 'oxide.ts';
import {
  EntityValidationError,
  UnableToSaveError,
} from '@core/error/entity-validate.error';
import { JwtService } from '@nestjs/jwt';
import { todayString } from '@core/util/dayjs';
import { InvalidCredentialsError } from '@app/users/users.error';

@Injectable()
export class AuthsUseCase {
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: UsersRepo,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    body: AuthsSignUp,
  ): Promise<
    Result<AuthsTokenData, UnableToSaveError | EntityValidationError>
  > {
    const newUser = UserEntity.create(body);
    const res = await this.usersRepo.save(newUser);

    if (res.isErr()) {
      return res;
    }

    const user = res.unwrap();

    return Ok({
      token: this.generateAccessToken(user.id),
      lastSignInAt: todayString(),
    });
  }

  async signIn(
    body: AuthsSignIn,
  ): Promise<
    Result<
      AuthsTokenData,
      UnableToSaveError | EntityValidationError | InvalidCredentialsError
    >
  > {
    const res = await this.usersRepo.getInstanceByEmail(body.email);

    if (res.isErr()) {
      return Err(new InvalidCredentialsError());
    }

    const user = res.unwrap();
    const err = user.checkPassword(body.password);
    if (err) {
      return err;
    }

    user.signIn();
    await this.usersRepo.save(user);

    return Ok({
      token: this.generateAccessToken(user.id),
      lastSignInAt: todayString(),
    });
  }

  private generateAccessToken(userId: number) {
    const payload = {
      sub: userId,
    };

    return this.jwtService.sign(payload);
  }
}

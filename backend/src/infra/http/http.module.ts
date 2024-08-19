import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { AppController } from './app.controller';

import { UserSignUpUseCase } from '../../app/user-management/use-case/user-signup.usecase';
import { UserSignInUseCase } from '../../app/user-management/use-case/user-signin.usecase';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [UserSignUpUseCase, UserSignInUseCase],
  exports: [],
})
export class HttpModule {}

import { Module } from '@nestjs/common';

import { UserController } from './controller/user.controller';

import { UserSignUpUseCase } from '../../../app/user-management/use-case/user-signup.usecase';
import { UserSignInUseCase } from '../../../app/user-management/use-case/user-signin.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserSignUpUseCase, UserSignInUseCase],
  exports: [],
})
export class UserManagementHttpModule {}

import { Body, Controller, Post } from '@nestjs/common';

import { UserSignUpUseCase } from '../../app/user-management/use-case/user-signup.usecase';
import { UserSignInUseCase } from '../../app/user-management/use-case/user-signin.usecase';

import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('/user')
export class UserController {
  constructor(
    private userSignUpUseCase: UserSignUpUseCase,
    private userSignInUseCase: UserSignInUseCase,
  ) {}

  @Post('signup')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    const response = this.userSignUpUseCase.execute(userSignUpDto);
    return response;
  }

  @Post('signin')
  signIn(@Body() userSignInDto: UserSignInDto) {
    const response = this.userSignInUseCase.execute(userSignInDto);
    return response;
  }
}

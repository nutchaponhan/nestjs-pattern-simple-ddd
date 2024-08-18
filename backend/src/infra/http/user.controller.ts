import { Body, Controller, Post } from '@nestjs/common';

import { UserSignUpUseCase } from '../../app/user-management/use-case/user-signup.usecase';

import { UserSignUpDto } from './dto/user-signup.dto';

@Controller('/user')
export class UserController {
  constructor(private userSignUpUseCase: UserSignUpUseCase) {}

  @Post('')
  create(@Body() userSignUpDto: UserSignUpDto) {
    const response = this.userSignUpUseCase.execute(userSignUpDto);
    return response;
  }
}

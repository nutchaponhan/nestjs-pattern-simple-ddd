import { AuthsUseCase } from '@app/auths/usecase/auths.usecase';
import { Public } from '@core/util/constant';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { C } from 'api-spec';

@Controller()
export class AuthsHttpController {
  constructor(private readonly authsUsecase: AuthsUseCase) {}

  @Public()
  @TsRestHandler(C.auths.signIn)
  async signIn() {
    return tsRestHandler(C.auths.signIn, async ({ body }) => {
      const res = await this.authsUsecase.signIn({
        email: body.email,
        password: body.password,
      });

      if (res.isErr()) {
        return res.unwrapErr().toHttp();
      }

      return { status: 200, body: res.unwrap() };
    });
  }

  @Public()
  @TsRestHandler(C.auths.signUp)
  async signUp() {
    return tsRestHandler(C.auths.signUp, async ({ body }) => {
      const res = await this.authsUsecase.signUp({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      });

      if (res.isErr()) {
        return res.unwrapErr().toHttp();
      }

      return { status: 200, body: res.unwrap() };
    });
  }
}

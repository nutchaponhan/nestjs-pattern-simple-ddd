import { Controller } from '@nestjs/common';
import { UsersUsecase } from '../../usecase/users.usecase';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { C } from 'api-spec';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('users')
export class UsersHttpController {
  constructor(private readonly usersUsecase: UsersUsecase) {}

  @TsRestHandler(C.users.get)
  async findAll() {
    return tsRestHandler(C.users.get, async () => {
      const res = await this.usersUsecase.findAll();
      return { status: 200, body: res.unwrap() };
    });
  }

  @TsRestHandler(C.users.getId)
  async findOne() {
    return tsRestHandler(C.users.getId, async ({ params }) => {
      const res = await this.usersUsecase.findOne(params.id);

      if (res.isErr()) {
        return res.unwrapErr()?.toHttp();
      }

      return { status: 200, body: res.unwrap() };
    });
  }
}

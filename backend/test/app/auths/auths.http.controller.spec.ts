import { AuthsHttpController } from '@app/auths/controller/http/auths.http.controller';
import { AuthsUseCase } from '@app/auths/usecase/auths.usecase';
import {
  AuthsSignIn,
  AuthsSignUp,
} from '@app/auths/usecase/auths.usecase.type';
import { InvalidCredentialsError } from '@app/users/users.error';
import {
  EntityValidationError,
  UnableToSaveError,
} from '@core/error/entity-validate.error';
import { INestApplication } from '@nestjs/common';
import { CreateUsersFactory } from '@test/core/factories/users.factory';
import { createControllerTestingModule } from '@test/core/utils/test-modules';
import { ClientInferResponseBody } from '@ts-rest/core';
import { C } from 'api-spec';
import { Err, Ok } from 'oxide.ts';
import * as request from 'supertest';

const signInPath = C.auths.signIn.path;

type SignInResponse = ClientInferResponseBody<typeof C.auths.signIn, 200>;
type SignInErrorResponse = ClientInferResponseBody<typeof C.auths.signIn, 400>;

const signUpPath = C.auths.signUp.path;
type SignUpResponse = ClientInferResponseBody<typeof C.auths.signUp, 200>;
type SignUpErrorResponse = ClientInferResponseBody<typeof C.auths.signUp, 400>;

const mockAuthsUsecase = {
  signIn: jest.fn(),
  signUp: jest.fn(),
};
describe('AuthsHttpController', () => {
  let app: INestApplication;
  let usecase: typeof mockAuthsUsecase;

  beforeAll(async () => {
    const { module, nestApp } = await createControllerTestingModule(
      AuthsHttpController,
      [
        {
          provide: AuthsUseCase,
          useValue: mockAuthsUsecase,
        },
      ],
    );

    app = nestApp;
    usecase = module.get(AuthsUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`POST ${signInPath}`, () => {
    let body: AuthsSignIn;

    beforeAll(() => {
      const data = CreateUsersFactory.build();
      body = {
        email: data.email,
        password: data.password,
      };
    });

    it('Should return 200 and token', async () => {
      const lastSignInAt = new Date().toISOString();
      usecase.signIn.mockResolvedValue(
        Ok({
          token: 'token',
          lastSignInAt,
        }),
      );

      return request(app.getHttpServer())
        .post(signInPath)
        .send(body)
        .expect(200)
        .expect(({ body }: { body: SignInResponse }) => {
          expect(body.token).toEqual('token');
          expect(body.lastSignInAt).toEqual(lastSignInAt);
        });
    });

    it('Should return 400 if wrong account', async () => {
      usecase.signIn.mockResolvedValue(Err(new InvalidCredentialsError()));

      return request(app.getHttpServer())
        .post(signInPath)
        .send(body)
        .expect(400)
        .expect(({ body }: { body: SignInErrorResponse }) => {
          expect(body.code).toEqual('400');
        });
    });

    it('Should return 400 if fail validation', async () => {
      usecase.signIn.mockResolvedValue(Err(new EntityValidationError()));

      return request(app.getHttpServer())
        .post(signInPath)
        .send(body)
        .expect(400)
        .expect(({ body }: { body: SignInErrorResponse }) => {
          expect(body.code).toEqual('400');
        });
    });

    it('Should return 500 if unable to save', async () => {
      usecase.signIn.mockResolvedValue(Err(new UnableToSaveError()));

      return request(app.getHttpServer())
        .post(signInPath)
        .send(body)
        .expect(500)
        .expect(({ body }: { body: SignInErrorResponse }) => {
          expect(body.code).toEqual('500');
        });
    });
  });

  describe(`POST ${signUpPath}`, () => {
    let body: AuthsSignUp;

    beforeAll(() => {
      const data = CreateUsersFactory.build();
      body = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };
    });

    it('Should return 200 and token', async () => {
      const lastSignInAt = new Date().toISOString();
      usecase.signUp.mockResolvedValue(
        Ok({
          token: 'token',
          lastSignInAt,
        }),
      );

      return request(app.getHttpServer())
        .post(signUpPath)
        .send(body)
        .expect(200)
        .expect(({ body }: { body: SignUpResponse }) => {
          expect(body.token).toEqual('token');
          expect(body.lastSignInAt).toEqual(lastSignInAt);
        });
    });

    it('Should return 400 if fail validation', async () => {
      usecase.signUp.mockResolvedValue(Err(new EntityValidationError()));

      return request(app.getHttpServer())
        .post(signUpPath)
        .send(body)
        .expect(400)
        .expect(({ body }: { body: SignUpErrorResponse }) => {
          expect(body.code).toEqual('400');
        });
    });

    it('Should return 500 if unable to save', async () => {
      usecase.signUp.mockResolvedValue(Err(new UnableToSaveError()));

      return request(app.getHttpServer())
        .post(signUpPath)
        .send(body)
        .expect(500)
        .expect(({ body }: { body: SignUpErrorResponse }) => {
          expect(body.code).toEqual('500');
        });
    });
  });
});

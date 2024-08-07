import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersUsecase } from '@app/users/usecase/users.usecase';
import { createControllerTestingModule } from '../../core/utils/test-modules';
import { UsersFactory } from '@testcore/factories/users.factory';
import { Err, Ok } from 'oxide.ts';
import { UserNotFoundError } from '@app/users/users.error';
import { UsersHttpController } from '@app/users/controller/http/users.http.controller';
import { faker } from '@faker-js/faker';
import { C } from 'api-spec';

const mockDateStr = {
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
  lastSignInAt: faker.date.anytime().toISOString(),
};
const mockUser = UsersFactory.build(mockDateStr);
const mockUsers = UsersFactory.buildList(2, mockDateStr);

const getPath = C.users.get.path;
const getIdPath = C.users.getId.path;
const getIdPathSet = (id: number) => getIdPath.replace(':id', id.toString());

const mockUsersUsecase = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('UsersHttpController', () => {
  let app: INestApplication;
  let usecase: typeof mockUsersUsecase;

  beforeAll(async () => {
    const { module, nestApp } = await createControllerTestingModule(
      UsersHttpController,
      [
        {
          provide: UsersUsecase,
          useValue: mockUsersUsecase,
        },
      ],
    );

    app = nestApp;
    usecase = module.get(UsersUsecase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET ${getPath}`, () => {
    it('should return an array of users', async () => {
      usecase.findAll.mockResolvedValue(Ok(mockUsers));

      return request(app.getHttpServer())
        .get(getPath)
        .expect(200)
        .expect(({ body }) => {
          expect(usecase.findAll).toHaveBeenCalled();

          expect(body).toEqual(mockUsers);
          expect(body).toHaveLength(2);
        });
    });
  });

  describe(`GET ${getIdPath}`, () => {
    it('should return a single user', async () => {
      usecase.findOne.mockResolvedValue(Ok(mockUser));

      return request(app.getHttpServer())
        .get(getIdPathSet(1))
        .expect(200)
        .expect(({ body }) => {
          expect(usecase.findOne).toHaveBeenCalledWith(1);

          expect(body).toEqual(mockUser);
        });
    });

    it('should return 400 if user not found', async () => {
      usecase.findOne.mockResolvedValue(Err(new UserNotFoundError()));

      return request(app.getHttpServer())
        .get(getIdPathSet(1))
        .expect(400)
        .expect(({ body }) => {
          expect(body.code).toBe('400');
        });
    });
  });
});

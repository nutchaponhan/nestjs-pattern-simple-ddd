import { AuthsUseCase } from '@app/auths/usecase/auths.usecase';
import {
  AuthsSignIn,
  AuthsSignUp,
} from '@app/auths/usecase/auths.usecase.type';
import { UserEntity } from '@app/users/domain/users.entity';
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from '@app/users/users.error';
import { UnableToSaveError } from '@core/error/entity-validate.error';
import { JwtService } from '@nestjs/jwt';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';
import {
  CreateUsersFactory,
  UsersFactory,
} from '@test/core/factories/users.factory';
import { MOCK_SAVE, MOCK_SAVE_ERR } from '@test/core/utils/mock';
import { createMockTestingModule } from '@test/core/utils/test-modules';
import { Err, Ok } from 'oxide.ts';

const mockRepo = {
  getInstanceByEmail: jest.fn(),
  save: jest.fn(),
};
const mockJwtService = {
  sign: jest.fn(),
};
describe('AuthsUsecase', () => {
  let usecase: AuthsUseCase;
  let repo: typeof mockRepo;
  let jwtService: typeof mockJwtService;

  beforeAll(async () => {
    const module = await createMockTestingModule(AuthsUseCase, [
      {
        provide: USERS_REPO,
        useValue: mockRepo,
      },
      {
        provide: JwtService,
        useValue: mockJwtService,
      },
    ]);

    usecase = module.get(AuthsUseCase);
    repo = module.get(USERS_REPO);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('signUp', () => {
    let body: AuthsSignUp;
    let user: UserEntity;

    beforeAll(() => {
      const { id, createdAt, updatedAt, ...props } = UsersFactory.build();
      user = new UserEntity({ id, createdAt, updatedAt, props });
      body = { ...props };
    });

    it('should return token', async () => {
      repo.save.mockImplementation(MOCK_SAVE);
      jwtService.sign.mockReturnValue('token');

      const res = await usecase.signUp(body);

      expect(res.isErr()).toEqual(false);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id });
      const data = res.unwrap();

      expect(data.token).toEqual('token');
      expect(data).toMatchObject({
        token: expect.any(String),
        lastSignInAt: expect.any(String),
      });
    });

    it('should return error if cant save', async () => {
      repo.save.mockImplementation(MOCK_SAVE_ERR);
      jwtService.sign.mockReturnValue('token');

      const res = await usecase.signUp(body);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UnableToSaveError);
    });
  });

  describe('signIn', () => {
    let body: AuthsSignIn;
    let user: UserEntity;

    beforeAll(() => {
      const data = CreateUsersFactory.build();
      body = {
        email: data.email,
        password: data.password,
      };
      const { id, createdAt, updatedAt, ...props } = UsersFactory.build({
        password: body.password,
        email: body.email,
      });
      user = new UserEntity({
        id,
        createdAt,
        updatedAt,
        props,
      });
    });

    it('should return token', async () => {
      user.changePassword(body.password);
      repo.getInstanceByEmail.mockResolvedValue(Ok(user));
      repo.save.mockImplementation(MOCK_SAVE);
      jwtService.sign.mockReturnValue('token');

      const res = await usecase.signIn(body);

      expect(res.isErr()).toEqual(false);
      expect(repo.getInstanceByEmail).toHaveBeenCalledWith(body.email);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id });

      const data = res.unwrap();

      expect(data.token).toEqual('token');
      expect(data).toMatchObject({
        token: expect.any(String),
        lastSignInAt: expect.any(String),
      });
    });

    it('should throw InvalidCredentialsError if not found', async () => {
      repo.getInstanceByEmail.mockResolvedValue(Err(new UserNotFoundError()));

      const res = await usecase.signIn(body);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError wrong password', async () => {
      user.changePassword('newpass');
      repo.getInstanceByEmail.mockResolvedValue(Ok(user));

      const res = await usecase.signIn(body);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(InvalidCredentialsError);
    });

    it('should throw UnableToSaveError if cant save', async () => {
      user.changePassword(body.password);
      repo.getInstanceByEmail.mockResolvedValue(Ok(user));
      repo.save.mockImplementation(MOCK_SAVE_ERR);

      const res = await usecase.signIn(body);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UnableToSaveError);
    });
  });
});

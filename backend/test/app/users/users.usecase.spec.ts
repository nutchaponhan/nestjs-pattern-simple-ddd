import { UsersUsecase } from '@app/users/usecase/users.usecase';
import { TestingModule } from '@nestjs/testing';
import { createMockTestingModule } from '@testcore/utils/test-modules';
import { UsersFactory } from '@testcore/factories/users.factory';
import { Err, Ok } from 'oxide.ts';
import { UserNotFoundError } from '@app/users/users.error';
import { UsersRepoFindOne } from '@repo/users/users.repo.type';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';

const mockUserRepo = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('UserUsecase', () => {
  let usecase: UsersUsecase;
  let repo: typeof mockUserRepo;

  beforeAll(async () => {
    const module: TestingModule = await createMockTestingModule(UsersUsecase, [
      {
        provide: USERS_REPO,
        useValue: mockUserRepo,
      },
    ]);

    usecase = module.get(UsersUsecase);
    repo = module.get(USERS_REPO);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('findAll', () => {
    it('should return empty array if no user found', async () => {
      repo.findAll.mockResolvedValue(Ok([]));

      const res = await usecase.findAll();
      expect(res.isErr()).toBe(false);

      const users = res.unwrap();
      expect(repo.findAll).toHaveBeenCalled();
      expect(users).toBeInstanceOf(Array);
      expect(users).toEqual([]);
    });

    it('should return an array of users', async () => {
      const mockUsers = UsersFactory.buildList(2);
      repo.findAll.mockResolvedValue(Ok(mockUsers));

      const res = await usecase.findAll();

      const users = res.unwrap();
      expect(repo.findAll).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a single user', async () => {
      const mockUser = UsersFactory.build();

      const mockData: UsersRepoFindOne = {
        id: mockUser.id,
        email: mockUser.email,
      };
      repo.findOne.mockResolvedValue(Ok(mockData));

      const res = await usecase.findOne(id);

      expect(res.isErr()).toBe(false);
      const user = res.unwrap();
      expect(user).toEqual(mockData);
      expect(repo.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw error when user not found', async () => {
      repo.findOne.mockResolvedValue(Err(new UserNotFoundError()));

      const res = await usecase.findOne(id);

      expect(res.isErr()).toBe(true);
      expect(res.unwrapErr()).toBeInstanceOf(UserNotFoundError);
    });
  });
});

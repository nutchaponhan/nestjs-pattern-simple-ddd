import { TestingModule } from '@nestjs/testing';
import { createDrizzleRepoTestingModule } from '@testcore/utils/test-modules';
import { TestDrizzleService } from '@testcore/utils/test-drizzle.service';
import { $Users } from '@drizzle/schema';
import { UserNotFoundError } from '@app/users/users.error';
import { UsersRepo } from '@repo/users/users.repo';
import { USERS_REPO } from '@repo/users/users.repo.di-tokens';
import { UserEntity } from '@app/users/domain/users.entity';
import { CreateUsersFactory } from '../core/factories/users.factory';
describe('UsersRepo', () => {
  let repo: UsersRepo;
  let drizzle: TestDrizzleService;

  beforeAll(async () => {
    const module: TestingModule = await createDrizzleRepoTestingModule({
      provide: USERS_REPO,
      useClass: UsersRepo,
    });

    repo = module.get(USERS_REPO);
    drizzle = module.get(TestDrizzleService);
  });

  afterAll(async () => {
    await drizzle.close();
  });

  describe('findAll', () => {
    it('should be an array', async () => {
      const res = await repo.findAll();

      expect(res.isErr()).toEqual(false);
      expect(res.isOk()).toEqual(true);

      const users = res.unwrap();

      expect(users).toBeInstanceOf(Array);
    });

    it('should be empty when no user', async () => {
      const res = await repo.findAll();

      expect(res.isErr()).toEqual(false);
      expect(res.isOk()).toEqual(true);

      const users = res.unwrap();
      expect(users).toEqual([]);
    });

    it('should return users', async () => {
      const testUser = CreateUsersFactory.build();
      await drizzle.insert($Users, testUser);

      const res = await repo.findAll();

      expect(res.isErr()).toEqual(false);
      expect(res.isOk()).toEqual(true);

      const users = res.unwrap();
      expect(users).toHaveLength(1);
      const user = users[0];
      expect(user.email).toEqual(testUser.email);
    });
  });

  describe('findOne', () => {
    it('should error when no user', async () => {
      const res = await repo.findOne(1);
      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UserNotFoundError);
    });

    it('should return user', async () => {
      const testUser = CreateUsersFactory.build();
      const [id] = await drizzle.insert($Users, testUser);

      const res = await repo.findOne(id);

      expect(res.isErr()).toEqual(false);
      expect(res.isOk()).toEqual(true);

      const user = res.unwrap();
      expect(user.id).toBeDefined();
      expect(user.email).toEqual(testUser.email);
    });
  });

  describe('getInstance', () => {
    beforeEach(async () => {
      drizzle.cleanTables($Users);
    });

    it('Should return UsersEntity', async () => {
      const mockUser = CreateUsersFactory.build();
      const [id] = await drizzle.insert($Users, mockUser);

      const res = await repo.getInstance(id);

      expect(res.isErr()).toEqual(false);

      const user = res.unwrap();
      expect(user).toBeInstanceOf(UserEntity);

      const props = user.getProps();
      expect(props).toMatchObject(mockUser);
    });

    it('Should return error if not found', async () => {
      const res = await repo.getInstance(9999);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UserNotFoundError);
    });
  });

  describe('getInstanceByEmail', () => {
    beforeEach(async () => {
      drizzle.cleanTables($Users);
    });

    it('Should return UsersEntity', async () => {
      const mockUser = CreateUsersFactory.build();
      await drizzle.insert($Users, mockUser);

      const res = await repo.getInstanceByEmail(mockUser.email);

      expect(res.isErr()).toEqual(false);

      const user = res.unwrap();
      expect(user).toBeInstanceOf(UserEntity);

      const props = user.getProps();
      expect(props).toMatchObject(mockUser);
    });

    it('Should return error if not found', async () => {
      const res = await repo.getInstanceByEmail('test');

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UserNotFoundError);
    });
  });
});

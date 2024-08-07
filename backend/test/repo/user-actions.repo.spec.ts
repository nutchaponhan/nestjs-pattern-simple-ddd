import { TestingModule } from '@nestjs/testing';
import { createDrizzleRepoTestingModule } from '@testcore/utils/test-modules';
import { TestDrizzleService } from '@testcore/utils/test-drizzle.service';
import { $UserActions } from '@drizzle/schema';
import { USER_ACTIONS_REPO } from '@repo/user_actions/user-actions.repo.di-tokens';
import { UsersActionsRepo } from '@repo/user_actions/user-actions.repo';
import { CreateUserActionsFactory } from '@test/core/factories/user-actions.factory';
import { UserActionsEntity } from '@app/user-actions/domain/user-actions.entity';
import { UserActionNotFoundError } from '@app/user-actions/user-actions.error';
describe('UserActionsRepo', () => {
  let repo: UsersActionsRepo;
  let drizzle: TestDrizzleService;

  beforeAll(async () => {
    const module: TestingModule = await createDrizzleRepoTestingModule({
      provide: USER_ACTIONS_REPO,
      useClass: UsersActionsRepo,
    });

    repo = module.get(USER_ACTIONS_REPO);
    drizzle = module.get(TestDrizzleService);
  });

  afterAll(async () => {
    await drizzle.close();
  });

  describe('getInstance', () => {
    beforeEach(async () => {
      drizzle.cleanTables($UserActions);
    });

    it('Should return UserActionsEntity', async () => {
      const mockUserAction = CreateUserActionsFactory.build({ userId: null });
      const [id] = await drizzle.insert($UserActions, mockUserAction);

      const res = await repo.getInstance(id);

      expect(res.isErr()).toEqual(false);

      const user = res.unwrap();
      expect(user).toBeInstanceOf(UserActionsEntity);

      const props = user.getProps();
      expect(props).toMatchObject(mockUserAction);
    });

    it('Should return error if not found', async () => {
      const res = await repo.getInstance(9999);

      expect(res.isErr()).toEqual(true);
      expect(res.unwrapErr()).toBeInstanceOf(UserActionNotFoundError);
    });
  });
});

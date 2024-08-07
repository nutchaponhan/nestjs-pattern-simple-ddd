import { UserActionsEntity } from '@app/user-actions/domain/user-actions.entity';
import { UserActionEntityProps } from '@app/user-actions/domain/user-actions.entity.type';
import { $InsertUserActions } from '@drizzle/schema.type';
import { CreateUserActionsFactory } from '@test/core/factories/user-actions.factory';

const userActionData = CreateUserActionsFactory.build();
const createData: UserActionEntityProps = {
  action: userActionData.action,
  userId: userActionData.userId,
};

describe('UserActionsEntity', () => {
  describe('create', () => {
    it('Should create new user entity', () => {
      const res = UserActionsEntity.create(createData);

      expect(res).toBeInstanceOf(UserActionsEntity);

      const props = res.getProps();
      expect(props.id).toEqual(null);
      expect(props).toMatchObject(userActionData);
    });
  });

  describe('toDbValues', () => {
    let user: UserActionsEntity;

    beforeAll(() => {
      user = UserActionsEntity.create(createData);
    });

    it('should return correct insert data', () => {
      const res = user.toDbValues();

      const expected: $InsertUserActions = {
        action: createData.action,
        userId: createData.userId,
      };
      expect(res).toMatchObject(expected);
    });
  });
});

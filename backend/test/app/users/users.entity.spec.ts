import { CreateUsersFactory } from '@testcore/factories/users.factory';
import { $InsertUsers } from '@drizzle/schema.type';
import { UserEntity } from '@app/users/domain/users.entity';

const mockUser = CreateUsersFactory.build();

describe('UsersEntity', () => {
  describe('create', () => {
    it('Should create new user entity', () => {
      const res = UserEntity.create(mockUser);

      expect(res).toBeInstanceOf(UserEntity);

      const props = res.getProps();
      expect(props.id).toEqual(null);
      expect(props).toMatchObject(mockUser);
    });
  });

  describe('toDbValues', () => {
    let user: UserEntity;

    beforeAll(() => {
      user = UserEntity.create(mockUser);
    });

    it('should return correct insert data', () => {
      const res = user.toDbValues();

      const expected: $InsertUsers = {
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        password: mockUser.password,
        lastSignInAt: mockUser.lastSignInAt,
      };
      expect(res).toMatchObject(expected);
    });
  });
});

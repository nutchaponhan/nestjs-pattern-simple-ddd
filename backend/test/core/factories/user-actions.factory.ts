import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { $InsertUserActions, $SelectUserActions } from '@drizzle/schema.type';
import { UserAction } from '@app/user-actions/user-actions.constant';

export const CreateUserActionsFactory =
  Factory.Sync.makeFactory<$InsertUserActions>({
    action: faker.helpers.arrayElement(Object.values(UserAction)),
    userId: faker.number.int({ max: 1000 }),
  });

export const UserActionsFactory = Factory.Sync.makeFactory<$SelectUserActions>({
  id: Factory.each((i) => i),
  action: faker.helpers.arrayElement(Object.values(UserAction)),
  userId: faker.number.int(),
  createdAt: faker.date.anytime(),
});

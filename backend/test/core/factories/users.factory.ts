import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { $Users } from '@drizzle/schema';
import { $InsertUsers } from '@drizzle/schema.type';

export const CreateUsersFactory = Factory.Sync.makeFactory<$InsertUsers>({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
});

export const UsersFactory = Factory.Sync.makeFactory<
  typeof $Users.$inferSelect
>({
  id: Factory.each((i) => i),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  lastSignInAt: faker.date.anytime(),
});

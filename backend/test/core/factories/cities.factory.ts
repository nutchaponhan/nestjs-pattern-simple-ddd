import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { CITIES } from '@drizzle/schema';

export const CreateCityFactory = Factory.Sync.makeFactory<
  typeof CITIES.$inferInsert
>({
  name: faker.company.name(),
});

export const CitiesFactory = Factory.Sync.makeFactory<
  typeof CITIES.$inferSelect
>({
  id: Factory.each((i) => i),
  name: faker.company.name(),
  countryId: faker.number.int(),
});

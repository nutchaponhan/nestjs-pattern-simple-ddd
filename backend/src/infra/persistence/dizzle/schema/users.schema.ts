import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { $Order } from './orders.schema';

export const $User = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastSignInAt: timestamp('last_sign_in_at', { withTimezone: true }),
});

export const usersRelations = relations($User, ({ many }) => ({
  orders: many($Order),
}));

import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { $Users } from './users.schema';

export const $UserActions = pgTable('user_actions', {
  id: serial('id').primaryKey(),
  action: varchar('action', { length: 100 }).notNull(),
  userId: integer('user_id').references(() => $Users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

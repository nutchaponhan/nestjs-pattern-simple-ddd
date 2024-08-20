import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const $Order = pgTable('orders', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

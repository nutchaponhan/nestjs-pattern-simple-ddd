import {
  pgTable,
  integer,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const $Product = pgTable('products', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

import { pgTable, integer, serial, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { $Order } from './orders.schema';
import { $Product } from './product.schema';

export const $OrderProduct = pgTable('order_product', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => $Order.id),
  productId: integer('product_id').references(() => $Product.id),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const orderRelations = relations($OrderProduct, ({ one }) => ({
  order: one($Order, {
    fields: [$OrderProduct.orderId],
    references: [$Order.id],
  }),
  product: one($Product, {
    fields: [$OrderProduct.productId],
    references: [$Product.id],
  }),
}));

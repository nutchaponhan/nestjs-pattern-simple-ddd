import { $UserActions, $Users } from './schema';

export type $InsertUsers = typeof $Users.$inferInsert;
export type $SelectUsers = typeof $Users.$inferSelect;
export type $InsertUserActions = typeof $UserActions.$inferInsert;
export type $SelectUserActions = typeof $Users.$inferSelect;

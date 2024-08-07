import { Provider } from '@nestjs/common';
import { USERS_REPO } from './users/users.repo.di-tokens';
import { UsersRepo } from './users/users.repo';
import { USER_ACTIONS_REPO } from './user_actions/user-actions.repo.di-tokens';
import { UsersActionsRepo } from './user_actions/user-actions.repo';

export const REPO_PROVIDER: Array<Provider> = [
  {
    provide: USERS_REPO,
    useClass: UsersRepo,
  },
  {
    provide: USER_ACTIONS_REPO,
    useClass: UsersActionsRepo,
  },
];

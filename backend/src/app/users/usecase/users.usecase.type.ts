import {
  UsersRepoFindAll,
  UsersRepoFindOne,
} from '@repo/users/users.repo.type';

// Service
// Usecase

export interface UsersUsecaseFindAll extends UsersRepoFindAll {}
export interface UsersUsecaseFindOne extends UsersRepoFindOne {}

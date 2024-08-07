export interface UsersRepoFindAll
  extends Array<{
    id: number;
    email: string;
  }> {}

export interface UsersRepoFindOne {
  id: number;
  email: string;
}

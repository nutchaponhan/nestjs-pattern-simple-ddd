import { Global, Module } from '@nestjs/common';
import { REPO_PROVIDER } from './repo.provider';

@Global()
@Module({
  providers: REPO_PROVIDER,
  exports: REPO_PROVIDER,
})
export class RepoModule {}

import { Module } from '@nestjs/common';

import { UserManagementHttpModule } from '../../infra/http/user-management/user-management.http.module';

@Module({
  imports: [UserManagementHttpModule],
  controllers: [],
  providers: [],
})
export class UserManagementModule {}

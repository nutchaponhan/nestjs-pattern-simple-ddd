import { Module } from '@nestjs/common';

import { UserRepository } from '../../../app/user-management/ports/user.repositoy';

// Non exported
import { DrizzleService } from './drizzle.service';
import { DrizzleUserRepository } from './repository/user.repository';

@Module({
  imports: [],
  providers: [
    DrizzleService,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
  ],
  exports: [DrizzleService, UserRepository],
})
export class DrizzleModule {}

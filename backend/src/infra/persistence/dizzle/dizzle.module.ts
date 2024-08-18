import { Module } from '@nestjs/common';

import { UserRepository } from '../../../app/user-management/ports/user.repositoy';

// Non exported
import { DrizzleService } from './dizzle.service';
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
  exports: [UserRepository],
})
export class DrizzleModule {}

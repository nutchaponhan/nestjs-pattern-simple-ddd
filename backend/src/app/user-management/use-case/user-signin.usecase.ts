import { Injectable } from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

interface UserSignInCommand {
  email: string;
  password: string;
}

@Injectable()
export class UserSignInUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: UserSignInCommand): Promise<boolean> {
    const user = await this.userRepository.find({ email });
    return user.checkPassword(password);
  }
}

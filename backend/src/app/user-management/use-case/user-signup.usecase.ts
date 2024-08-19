import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/user-management/user';
import { UserRepository } from '../ports/user.repository';

interface CreateUserUseCaseCommand {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class UserSignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserUseCaseCommand): Promise<any> {
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await this.userRepository.create(user);

    return response;
  }
}

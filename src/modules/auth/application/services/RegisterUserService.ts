import { User } from "@prisma/client";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";

import { IBcrypt } from "providers/bcrypt/bcrypt";

import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository,
    @inject("bcrypt")
    private bcrypt: IBcrypt
  ) {}

  public async execute(user: User): Promise<User | null> {
    const userAlreadyExists = await this.repository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new AuthError(AuthErrorStatus.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.bcrypt.hash(user.password);

    return await this.repository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: passwordHash,
      role: user.role,
    });
  }
}

import { User } from "@prisma/client";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository
  ) {}

  public async execute(id: number): Promise<User | null> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AuthError(AuthErrorStatus.USER_NOT_FOUND);
    }
    return user;
  }
}

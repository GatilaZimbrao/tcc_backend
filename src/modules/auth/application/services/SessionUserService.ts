import { User } from "@prisma/client";

import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";

import { container, inject, injectable } from "tsyringe";
import { DecodeTokensService } from "./DecodeTokensService";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";

@injectable()
export class SessionUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository,
    private decodeTokensService: DecodeTokensService
  ) {}

  public async execute(sessionToken: string | undefined): Promise<User | null> {
    if (sessionToken && sessionToken.includes("Bearer ")) {
      try {
        const decoded = await this.decodeTokensService.execute({
          bearerToken: sessionToken,
        });

        const user = await this.repository.findById(decoded.id);

        if (user) {
          return user;
        } else {
          throw new AuthError(AuthErrorStatus.USER_NOT_FOUND);
        }
      } catch (e) {
        throw new AuthError(AuthErrorStatus.NO_TOKEN_PROVIDED);
      }
    } else {
      throw new AuthError(AuthErrorStatus.NO_TOKEN_PROVIDED);
    }
  }
}

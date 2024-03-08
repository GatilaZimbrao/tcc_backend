import { User } from "@prisma/client";
import authConfig from "@shared/config/auth";

import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";
import { UserRepository } from "modules/user/domain/repositories/UserRepository";

import { container, inject, injectable } from "tsyringe";
import { DecodeTokensService } from "./DecodeTokensService";

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

    // const userAlreadyExists = await this.repository.findByEmail(user.email);
    // if (userAlreadyExists) {
    //   throw new AuthError(AuthErrorStatus.USER_ALREADY_EXISTS);
    // }
    // const passwordHash = await this.bcrypt.hash(user.password);
    // return await this.repository.create({
    //   id: user.id,
    //   email: user.email,
    //   name: user.name,
    //   password: passwordHash,
    // });
  }
}

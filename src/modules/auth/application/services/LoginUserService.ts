import { User } from "@prisma/client";

import { IBcrypt } from "providers/bcrypt/bcrypt";

import { inject, injectable } from "tsyringe";
import { GenerateTokensService } from "./GenerateTokensService";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";

type Params = {
  email: string;
  password: string;
};

type Response = {
  token: string;
  user: User;
};

@injectable()
export class LoginUserService {
  constructor(
    @inject("UserRepository")
    private repository: UserRepository,
    private generateTokens: GenerateTokensService,
    @inject("bcrypt")
    private bcrypt: IBcrypt
  ) {}

  public async execute({ email, password }: Params): Promise<Response> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AuthError(AuthErrorStatus.WRONG_CREDENTIALS);
    }
    const passwordMatch = await this.bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AuthError(AuthErrorStatus.WRONG_CREDENTIALS);
    }

    const { token } = await this.generateTokens.execute({
      user,
    });

    return {
      token,
      user,
    };
  }
}

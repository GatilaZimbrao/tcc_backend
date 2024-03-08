import authConfig from "@shared/config/auth";
import { IJwt } from "providers/jwt/jwt";
import { inject, injectable } from "tsyringe";
import { User } from "@prisma/client";

type Params = {
  user: Pick<User, "id" | "email" | "name">;
};

type Response = {
  token: string;
};

@injectable()
export class GenerateTokensService {
  constructor(
    @inject("jwt")
    private jwt: IJwt
  ) {}

  public async execute(dto: Params): Promise<Response> {
    const { user } = dto;
    const { id, email, name } = user;

    const token = this.jwt.encode(undefined, authConfig.SECRET, {
      email,
      id,
      name,
    });

    return {
      token,
    };
  }
}

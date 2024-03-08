import authConfig from "@shared/config/auth";
import { IJwt } from "providers/jwt/jwt";
import { inject, injectable } from "tsyringe";

type Params = {
  bearerToken: string;
};

@injectable()
export class DecodeTokensService {
  constructor(
    @inject("jwt")
    private jwt: IJwt
  ) {}

  public async execute(dto: Params): Promise<any> {
    const { bearerToken } = dto;

    return this.jwt.decode(bearerToken.split("Bearer ")[1], authConfig.SECRET);
  }
}

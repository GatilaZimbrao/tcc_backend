import { VerifyErrors } from "jsonwebtoken";

export interface IJwt {
  encode(
    ttl: string | number | undefined,
    secret: string,
    data: Record<string, unknown>
  ): string;

  decode(token: string, secret: string): Promise<VerifyErrors | any>;
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

import { IJwt } from "providers/jwt/jwt";
import { injectable } from "tsyringe";

@injectable()
export class Jwt implements IJwt {
  encode(ttl: string | number | undefined, secret: string, data: any): string {
    const jwtOptions: jwt.SignOptions = {};

    if (ttl !== undefined) jwtOptions.expiresIn = ttl;

    return jwt.sign(data, secret, jwtOptions);
  }

  decode(token: string, secret: string): Promise<jwt.VerifyErrors | any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(null);
        }
        resolve(decoded);
      });
    });
  }
}

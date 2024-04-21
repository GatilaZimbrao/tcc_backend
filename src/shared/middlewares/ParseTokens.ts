import { NextFunction, Request, Response } from "express";
import authConfig from "@shared/config/auth";

import { container } from "tsyringe";
import { IJwt } from "../../providers/jwt/jwt";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";

export async function parseTokens(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessionToken = req.headers.authorization;

    req.context = {};

    if (sessionToken && sessionToken.includes("Bearer ")) {
      const jwt = container.resolve<IJwt>("jwt");
      try {
        const decoded = await jwt.decode(
          sessionToken.split("Bearer ")[1],
          authConfig.SECRET
        );

        const userRepository =
          container.resolve<UserRepository>("UserRepository");
        const user = await userRepository.findById(decoded.id);

        if (user) {
          req.context.user = {
            id: user?.id,
            role: user?.role,
          };
        }
      } catch (e) {
        console.log(e);
      }
    }

    next();
  } catch (_) {
    /**/
  }
}

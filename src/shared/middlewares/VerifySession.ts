import { NextFunction, Request, Response } from "express";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";

export async function VerifySession(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  if (!req.context.user) throw new AuthError(AuthErrorStatus.INVALID_TOKEN);

  next();
}

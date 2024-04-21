import { NextFunction, Request, Response } from "express";
import { FindByIdUserService } from "modules/auth/application/services/FindByIdUserService";
import { container } from "tsyringe";

import { Role } from "modules/auth/domain/models/RoleModel";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";
import { hasPermission } from "modules/auth/shared/utils/hasPermission";

export function PermitRole(roles: Role[]) {
  return async function (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const contextUser = req.context.user;

    if (!contextUser) throw new AuthError(AuthErrorStatus.INVALID_TOKEN);

    const findUserByIdService = container.resolve(FindByIdUserService);

    const user = await findUserByIdService.execute(Number(contextUser.id));

    if (!user) {
      throw new AuthError(AuthErrorStatus.USER_NOT_FOUND);
    }
    const allowed = hasPermission(user, roles);
    if (!allowed) throw new AuthError(AuthErrorStatus.NOT_AUTHORIZED);

    next();
  };
}

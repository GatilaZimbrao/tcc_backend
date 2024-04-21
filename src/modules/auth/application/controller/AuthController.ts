import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";
import { LoginUserService } from "../services/LoginUserService";
import { removeFields } from "@shared/utils/removeFields";
import { RegisterUserService } from "../services/RegisterUserService";
import {
  AuthError,
  AuthErrorStatus,
} from "modules/auth/shared/error/AuthError";

import { SessionUserService } from "../services/SessionUserService";
import { ROLES } from "modules/auth/domain/models/RoleModel";

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const loginService = container.resolve(LoginUserService);

    const response = await loginService.execute({
      email,
      password,
    });

    const parsed = removeFields({ ...response.user }, ["password"]);

    res.status(200).json({
      token: response.token,
      user: parsed,
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      throw new AuthError(AuthErrorStatus.MISSING_PARAMS);
    }

    if (password !== confirmPassword) {
      throw new AuthError(AuthErrorStatus.PASSWORD_DIFERENT);
    }

    const registerService = container.resolve(RegisterUserService);

    const user = await registerService.execute({
      id: 0,
      email: email,
      name: name,
      password: password,
      role: ROLES.user,
    });

    res.status(201).json({
      id: user?.id,
      email: user?.email,
      name: user?.name,
      role: user?.role,
    });
  }

  async session(req: Request, res: Response): Promise<void> {
    const sessionToken = req.headers.authorization;

    const sessionService = container.resolve(SessionUserService);

    const user = await sessionService.execute(sessionToken);
    const parsed = removeFields({ ...user }, ["password"]);

    res.status(200).json(parsed);
  }
}

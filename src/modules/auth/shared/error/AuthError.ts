import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum AuthErrorStatus {
  WRONG_CREDENTIALS,
  MISSING_PARAMS,
  PASSWORD_DIFERENT,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  NO_TOKEN_PROVIDED,
  INVALID_TOKEN,
  NOT_AUTHORIZED,
}

export const errorProps: Record<AuthErrorStatus, AppErrorProps> = {
  [AuthErrorStatus.WRONG_CREDENTIALS]: {
    statusCode: 401,
    message: "Dados incorretos",
  },

  [AuthErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [AuthErrorStatus.PASSWORD_DIFERENT]: {
    statusCode: 400,
    message: "As senhas devem ser iguais",
  },

  [AuthErrorStatus.USER_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Usuário já existente",
  },

  [AuthErrorStatus.USER_NOT_FOUND]: {
    statusCode: 404,
    message: "Usuário não encontrado",
  },

  [AuthErrorStatus.NO_TOKEN_PROVIDED]: {
    statusCode: 400,
    message: "Token não inserido",
  },

  [AuthErrorStatus.INVALID_TOKEN]: {
    statusCode: 400,
    message: "Token inválido",
  },
  [AuthErrorStatus.NOT_AUTHORIZED]: {
    statusCode: 401,
    message: "Acesso negado, permissão insuficiente",
  },
};
export class AuthError extends AppError {
  constructor(status: AuthErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

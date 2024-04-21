import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum ExtensionErrorStatus {
  MISSING_PARAMS,
  EXTENSION_TYPE_INVALID,
  EXTENSION_ALREADY_EXISTS,
  EXTENSION_DONT_EXISTS,
}

export const errorProps: Record<ExtensionErrorStatus, AppErrorProps> = {
  [ExtensionErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [ExtensionErrorStatus.EXTENSION_TYPE_INVALID]: {
    statusCode: 400,
    message: "Tipo de atividade inválida",
  },

  [ExtensionErrorStatus.EXTENSION_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Atividade de Entensão já existente",
  },

  [ExtensionErrorStatus.EXTENSION_DONT_EXISTS]: {
    statusCode: 400,
    message: "Atividade de Entensão não existente",
  },
};

export class ExtensionError extends AppError {
  constructor(status: ExtensionErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

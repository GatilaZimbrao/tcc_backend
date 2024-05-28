import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum ExtensionErrorStatus {
  MISSING_PARAMS,
  EXTENSION_TYPE_INVALID,
  EXTENSION_ALREADY_EXISTS,
  EXTENSION_DONT_EXISTS,
  EXTENSION_TEACHER_DONT_EXISTS,
  EXTENSION_DUPLICATE_TEACHER,
  EXTENSION_TOO_MANY_TEACHERS,
}

export const errorProps: Record<ExtensionErrorStatus, AppErrorProps> = {
  [ExtensionErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando.",
  },

  [ExtensionErrorStatus.EXTENSION_TYPE_INVALID]: {
    statusCode: 400,
    message: "Tipo de atividade inválida.",
  },

  [ExtensionErrorStatus.EXTENSION_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Atividade de Entensão já existente.",
  },

  [ExtensionErrorStatus.EXTENSION_DONT_EXISTS]: {
    statusCode: 400,
    message: "Atividade de Entensão não existente.",
  },

  [ExtensionErrorStatus.EXTENSION_TEACHER_DONT_EXISTS]: {
    statusCode: 400,
    message: "O Docente atribuído a atividade não existe.",
  },

  [ExtensionErrorStatus.EXTENSION_DUPLICATE_TEACHER]: {
    statusCode: 400,
    message: "o docente já foi passado",
  },

  [ExtensionErrorStatus.EXTENSION_TOO_MANY_TEACHERS]: {
    statusCode: 400,
    message: "Uma atividade pode ter até 2 docentes",
  },
};

export class ExtensionError extends AppError {
  constructor(status: ExtensionErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

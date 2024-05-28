import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum TeacherErrorStatus {
  MISSING_PARAMS,
  TEACHER_ALREADY_EXISTS,
  TEACHER_DONT_EXISTS,
  TEACHER_TYPE_INVALID,
}

export const errorProps: Record<TeacherErrorStatus, AppErrorProps> = {
  [TeacherErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [TeacherErrorStatus.TEACHER_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Docente já existente",
  },

  [TeacherErrorStatus.TEACHER_DONT_EXISTS]: {
    statusCode: 400,
    message: "Docente não existente",
  },


  [TeacherErrorStatus.TEACHER_TYPE_INVALID]: {
    statusCode: 400,
    message: "Tipo de docente inválido.",
  },

  
};

export class TeacherError extends AppError {
  constructor(status: TeacherErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

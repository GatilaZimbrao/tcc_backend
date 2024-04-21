import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum ContactErrorStatus {
  MISSING_PARAMS,
  CONTACT_ALREADY_EXISTS,
  CONTACT_DONT_EXISTS,
}

export const errorProps: Record<ContactErrorStatus, AppErrorProps> = {
  [ContactErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [ContactErrorStatus.CONTACT_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Contato já existente",
  },

  [ContactErrorStatus.CONTACT_DONT_EXISTS]: {
    statusCode: 400,
    message: "Contato não existente",
  },
};

export class ContactError extends AppError {
  constructor(status: ContactErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

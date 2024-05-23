import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum PageErrorStatus {
  MISSING_PARAMS,
  PAGE_ALREADY_EXISTS,
  PAGE_DONT_EXISTS,
}

export const errorProps: Record<PageErrorStatus, AppErrorProps> = {
  [PageErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [PageErrorStatus.PAGE_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Página já existente",
  },

  [PageErrorStatus.PAGE_DONT_EXISTS]: {
    statusCode: 400,
    message: "Página não existente",
  },
};

export class PageError extends AppError {
  constructor(status: PageErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

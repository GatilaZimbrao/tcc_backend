import {
  FILE_ALLOWED_EXT,
  FILE_SIZE_LIMIT_MB,
} from "modules/file/config/config";
import { AppError, AppErrorProps } from "../../../../shared/error/AppError";

export enum FileErrorStatus {
  WRONG_CREDENTIALS,
  MISSING_PARAMS,
  FILE_ALREADY_EXISTS,
  FILE_SAVE_ERROR,
  FILE_DONT_EXISTS,

  WRONG_FILE_EXT,
  FILE_OVER_LIMIT,
}

export const errorProps: Record<FileErrorStatus, AppErrorProps> = {
  [FileErrorStatus.WRONG_CREDENTIALS]: {
    statusCode: 401,
    message: "Dados incorretos",
  },

  [FileErrorStatus.MISSING_PARAMS]: {
    statusCode: 400,
    message: "Parâmetros faltando",
  },

  [FileErrorStatus.FILE_ALREADY_EXISTS]: {
    statusCode: 409,
    message: "Arquivo já existente",
  },

  [FileErrorStatus.FILE_SAVE_ERROR]: {
    statusCode: 400,
    message: "Erro ao salvar arquivo",
  },

  [FileErrorStatus.FILE_DONT_EXISTS]: {
    statusCode: 400,
    message: "Arquivo não existente",
  },

  [FileErrorStatus.WRONG_FILE_EXT]: {
    statusCode: 422,
    message: `Apenas arquivos dos tipos ${FILE_ALLOWED_EXT.toString()} são permitidos`,
  },

  [FileErrorStatus.FILE_OVER_LIMIT]: {
    statusCode: 413,
    message: `Falha no upload, o arquivo está acima do limite de ${FILE_SIZE_LIMIT_MB} MB.`,
  },
};
export class FileError extends AppError {
  constructor(status: FileErrorStatus) {
    const props = errorProps[status];
    super(props.message, props.statusCode);
  }
}

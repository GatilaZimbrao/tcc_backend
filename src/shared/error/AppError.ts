export interface AppErrorProps {
  message: unknown;
  statusCode: number;
}
export class AppError implements AppErrorProps {
  message: unknown;
  statusCode: number;

  constructor(message: unknown, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

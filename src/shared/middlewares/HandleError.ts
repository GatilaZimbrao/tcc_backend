import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";

export async function handleError(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
): Promise<void> {
  if (error instanceof AppError) {
    res.status(error.statusCode).send({
      message: error.message,
    });
  } else {
    res.status(500).send({
      status: "Error",
      message: error.message,
    });
  }
}

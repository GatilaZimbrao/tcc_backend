import { NextFunction, Request, Response } from "express";
import { FileError, FileErrorStatus } from "../shared/error/FileError";

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) {
    throw new FileError(FileErrorStatus.MISSING_PARAMS);
  }

  next();
};

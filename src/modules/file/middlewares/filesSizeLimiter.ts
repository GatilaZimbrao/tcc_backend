import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { FILE_SIZE_LIMIT } from "../config/config";
import { FileError, FileErrorStatus } from "../shared/error/FileError";

export const filesSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as FileArray;

  const filesOverLimit: String[] = [];

  Object.keys(files).forEach((key) => {
    if (!Array.isArray(files[key])) {
      const uploadedFile: UploadedFile = files[key] as UploadedFile;

      if (uploadedFile.size > FILE_SIZE_LIMIT) {
        filesOverLimit.push(uploadedFile.name);
      }
    }
  });

  if (filesOverLimit.length) {
    throw new FileError(FileErrorStatus.FILE_OVER_LIMIT);
  }

  next();
};

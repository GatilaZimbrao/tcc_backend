import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";

export const filesSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MB = 5; // 5 MB
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;

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
    const properVerb = filesOverLimit.length > 1 ? "are" : "is";

    const message =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file siez limit of ${MB} MB.`.replaceAll(
        ",",
        ", "
      );

    return res.status(413).json({ status: "error", message: message });
  }

  next();
};

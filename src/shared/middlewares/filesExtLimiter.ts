import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

export const filesExtLimiter = (allowedExtArray: String[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as FileArray;

    const fileExtensions: String[] = [];

    Object.keys(files).forEach((key) => {
      if (!Array.isArray(files[key])) {
        const uploadedFile: UploadedFile = files[key] as UploadedFile;

        fileExtensions.push(path.extname(uploadedFile.name));
      }
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message: message });
    }

    next();
  };
};

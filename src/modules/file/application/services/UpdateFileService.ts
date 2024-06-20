import { File } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import { existsSync, unlinkSync } from "fs";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";
import {
  FileError,
  FileErrorStatus,
} from "modules/file/shared/error/FileError";
import path from "path";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(
    file: File,
    uploadedFile: UploadedFile
  ): Promise<File | null> {
    const idIsValid = await this.repository.findById(file.id);

    if (!idIsValid) {
      throw new FileError(FileErrorStatus.FILE_DONT_EXISTS);
    }

    const fileByName = await this.repository.findByName(file.name);

    if (fileByName && fileByName.id != file.id) {
      throw new FileError(FileErrorStatus.FILE_ALREADY_EXISTS);
    }

    let filename = idIsValid.file_name;

    if (idIsValid.file_name != file.file_name) {
      const filePath = path.join(
        __dirname,
        "../",
        "../",
        "archives",
        idIsValid.file_name
      );

      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }

      const uniqueSuffix = "cefet-" + Date.now() + "-";
      filename = uniqueSuffix + file.file_name;

      const newFilePath = path.join(
        __dirname,
        "../",
        "../",
        "archives",
        filename
      );

      uploadedFile.mv(newFilePath, (err: Error) => {
        if (err) {
          throw new FileError(FileErrorStatus.FILE_SAVE_ERROR);
        }
      });
    }

    return await this.repository.update({
      id: file.id,
      name: file.name,
      file_name: filename,
    });
  }
}

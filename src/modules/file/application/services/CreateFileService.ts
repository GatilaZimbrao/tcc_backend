import { File } from "@prisma/client";
import { FileArray, UploadedFile } from "express-fileupload";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";
import {
  FileError,
  FileErrorStatus,
} from "modules/file/shared/error/FileError";
import path from "path";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(
    file: File,
    uploadedFile: UploadedFile
  ): Promise<File | null> {
    const fileAlreadyExists = await this.repository.findByName(file.file_name);

    if (fileAlreadyExists) {
      throw new FileError(FileErrorStatus.FILE_ALREADY_EXISTS);
    }

    const filePath = path.join(
      __dirname,
      "../",
      "../",
      "archives",
      uploadedFile.name
    );

    uploadedFile.mv(filePath, (err: Error) => {
      if (err) {
        throw new FileError(FileErrorStatus.FILE_SAVE_ERROR);
      }
    });

    return await this.repository.create({
      id: file.id,
      name: file.name,
      type: file.type,
      file_name: file.file_name,
    });
  }
}

import { FileRepository } from "modules/file/domain/repositories/FileRepository";
import {
  FileError,
  FileErrorStatus,
} from "modules/file/shared/error/FileError";
import path from "path";

import { inject, injectable } from "tsyringe";
import fs from "fs";

@injectable()
export class DeleteFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const fileAlreadyExists = await this.repository.findById(id);

    if (fileAlreadyExists) {
      const filePath = path.join(
        __dirname,
        "../",
        "../",
        "archives",
        fileAlreadyExists.file_name
      );

      await this.repository.delete(id);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      throw new FileError(FileErrorStatus.FILE_DONT_EXISTS);
    }

    return null;
  }
}

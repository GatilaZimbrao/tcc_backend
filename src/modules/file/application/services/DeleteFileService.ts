import { FileRepository } from "modules/file/domain/repositories/FileRepository";
import {
  FileError,
  FileErrorStatus,
} from "modules/file/shared/error/FileError";

import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const fileAlreadyExists = await this.repository.findById(id);

    if (fileAlreadyExists) {
      await this.repository.delete(id);
    } else {
      throw new FileError(FileErrorStatus.FILE_DONT_EXISTS);
    }

    return null;
  }
}

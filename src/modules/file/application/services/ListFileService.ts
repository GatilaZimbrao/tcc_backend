import { File } from "@prisma/client";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class ListFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(): Promise<File[] | null> {
    return await this.repository.list();
  }
}

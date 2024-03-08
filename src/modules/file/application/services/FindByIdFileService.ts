import { File } from "@prisma/client";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(id: number): Promise<File | null> {
    return await this.repository.findById(id);
  }
}

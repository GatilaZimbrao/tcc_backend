import { File } from "@prisma/client";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class SearchFileService {
  constructor(
    @inject("FileRepository")
    private repository: FileRepository
  ) {}

  public async execute(term: string): Promise<File[] | null> {
    return await this.repository.search(term);
  }
}

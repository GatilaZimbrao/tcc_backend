import { Extension } from "@prisma/client";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class SearchExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(term: string): Promise<Extension[] | null> {
    return await this.repository.search(term);
  }
}

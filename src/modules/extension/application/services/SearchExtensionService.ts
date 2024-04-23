import { Extension } from "@prisma/client";
import { ExtensionType } from "modules/extension/domain/models/ExtensionTypeModel";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class SearchExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(
    extensionType: ExtensionType,
    term: string
  ): Promise<Extension[] | null> {
    return await this.repository.search(extensionType, term);
  }
}

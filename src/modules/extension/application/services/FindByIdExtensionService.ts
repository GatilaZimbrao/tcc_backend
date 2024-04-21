import { Extension } from "@prisma/client";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(id: number): Promise<Extension | null> {
    return await this.repository.findById(id);
  }
}

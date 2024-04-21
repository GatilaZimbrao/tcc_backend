import { Extension } from "@prisma/client";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";
import {
  ExtensionError,
  ExtensionErrorStatus,
} from "modules/extension/shared/error/ExtensionError";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(extension: Extension): Promise<Extension | null> {
    const idIsValid = await this.repository.findById(extension.id);

    if (!idIsValid) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_DONT_EXISTS);
    }

    const extensionByName = await this.repository.findByName(extension.name);

    if (extensionByName && extensionByName.id != extension.id) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_ALREADY_EXISTS);
    }

    return await this.repository.update({
      id: extension.id,
      name: extension.name,
      abstract: extension.abstract,
      email: extension.email,
      site: extension.site,
      type: extension.type,
      teacherId: extension.teacherId,
    });
  }
}

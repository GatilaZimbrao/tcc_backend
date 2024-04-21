import { Extension } from "@prisma/client";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";
import {
  ExtensionError,
  ExtensionErrorStatus,
} from "modules/extension/shared/error/ExtensionError";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(extension: Extension): Promise<Extension | null> {
    const extensionAlreadyExists = await this.repository.findByName(
      extension.name
    );

    if (extensionAlreadyExists) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_ALREADY_EXISTS);
    }

    return await this.repository.create({
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

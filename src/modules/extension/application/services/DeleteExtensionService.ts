import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";
import {
  ExtensionError,
  ExtensionErrorStatus,
} from "modules/extension/shared/error/ExtensionError";

import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const extensionAlreadyExists = await this.repository.findById(id);

    if (extensionAlreadyExists) {
      await this.repository.delete(id);
    } else {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_DONT_EXISTS);
    }

    return null;
  }
}

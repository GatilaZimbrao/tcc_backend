import { PageRepository } from "modules/page/domain/repositories/PageRepository";
import {
  PageError,
  PageErrorStatus,
} from "modules/page/shared/error/PageError";

import { inject, injectable } from "tsyringe";

@injectable()
export class DeletePageService {
  constructor(
    @inject("PageRepository")
    private repository: PageRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const pageAlreadyExists = await this.repository.findById(id);

    if (pageAlreadyExists) {
      await this.repository.delete(id);
    } else {
      throw new PageError(PageErrorStatus.PAGE_DONT_EXISTS);
    }

    return null;
  }
}

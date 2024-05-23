import { Page } from "@prisma/client";
import { PageRepository } from "modules/page/domain/repositories/PageRepository";
import {
  PageError,
  PageErrorStatus,
} from "modules/page/shared/error/PageError";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdatePageService {
  constructor(
    @inject("PageRepository")
    private repository: PageRepository
  ) {}

  public async execute(page: Page): Promise<Page | null> {
    const idIsValid = await this.repository.findById(page.id);

    if (!idIsValid) {
      throw new PageError(PageErrorStatus.PAGE_DONT_EXISTS);
    }

    const pageByName = await this.repository.findByName(page.pathName);

    if (pageByName && pageByName.id != page.id) {
      throw new PageError(PageErrorStatus.PAGE_ALREADY_EXISTS);
    }

    return await this.repository.update({
      id: page.id,
      pathName: page.pathName,
      title: page.title,
      description: page.description,
    });
  }
}

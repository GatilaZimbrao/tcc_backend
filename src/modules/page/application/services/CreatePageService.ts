import { Page } from "@prisma/client";
import { PageRepository } from "modules/page/domain/repositories/PageRepository";
import {
  PageError,
  PageErrorStatus,
} from "modules/page/shared/error/PageError";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePageService {
  constructor(
    @inject("PageRepository")
    private repository: PageRepository
  ) {}

  public async execute(page: Page): Promise<Page> {
    const pageAlreadyExists = await this.repository.findByName(page.pathName);

    if (pageAlreadyExists) {
      throw new PageError(PageErrorStatus.PAGE_ALREADY_EXISTS);
    }

    return await this.repository.create({
      id: page.id,
      pathName: page.pathName,
      title: page.title,
      description: page.description,
      additionalParams: page.additionalParams,
    });
  }
}

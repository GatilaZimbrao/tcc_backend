import { Page } from "@prisma/client";
import { PageRepository } from "modules/page/domain/repositories/PageRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class ListPageService {
  constructor(
    @inject("PageRepository")
    private repository: PageRepository
  ) {}

  public async execute(): Promise<Page[] | null> {
    return await this.repository.list();
  }
}

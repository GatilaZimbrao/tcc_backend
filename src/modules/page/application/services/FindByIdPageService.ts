import { Page } from "@prisma/client";
import { PageRepository } from "modules/page/domain/repositories/PageRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdPageService {
  constructor(
    @inject("PageRepository")
    private repository: PageRepository
  ) {}

  public async execute(id: number): Promise<Page | null> {
    return await this.repository.findById(id);
  }
}

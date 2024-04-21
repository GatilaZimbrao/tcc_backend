import { Contact } from "@prisma/client";
import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class ListContactService {
  constructor(
    @inject("ContactRepository")
    private repository: ContactRepository
  ) {}

  public async execute(): Promise<Contact[] | null> {
    return await this.repository.list();
  }
}

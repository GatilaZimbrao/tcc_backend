import { Contact } from "@prisma/client";
import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdContactService {
  constructor(
    @inject("ContactRepository")
    private repository: ContactRepository
  ) {}

  public async execute(id: number): Promise<Contact | null> {
    return await this.repository.findById(id);
  }
}

import { Contact } from "@prisma/client";
import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";
import {
  ContactError,
  ContactErrorStatus,
} from "modules/contact/shared/error/ContactError";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateContactService {
  constructor(
    @inject("ContactRepository")
    private repository: ContactRepository
  ) {}

  public async execute(contact: Contact): Promise<Contact | null> {
    const contactAlreadyExists = await this.repository.findByName(contact.name);

    if (contactAlreadyExists) {
      throw new ContactError(ContactErrorStatus.CONTACT_ALREADY_EXISTS);
    }

    return await this.repository.create({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      tel: contact.tel,
    });
  }
}

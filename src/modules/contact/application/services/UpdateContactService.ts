import { Contact } from "@prisma/client";
import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";
import {
  ContactError,
  ContactErrorStatus,
} from "modules/contact/shared/error/ContactError";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateContactService {
  constructor(
    @inject("ContactRepository")
    private repository: ContactRepository
  ) {}

  public async execute(contact: Contact): Promise<Contact | null> {
    const idIsValid = await this.repository.findById(contact.id);

    if (!idIsValid) {
      throw new ContactError(ContactErrorStatus.CONTACT_DONT_EXISTS);
    }

    const contactByName = await this.repository.findByName(contact.name);

    if (contactByName && contactByName.id != contact.id) {
      throw new ContactError(ContactErrorStatus.CONTACT_ALREADY_EXISTS);
    }

    return await this.repository.update({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      tel: contact.tel,
    });
  }
}

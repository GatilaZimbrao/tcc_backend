import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";
import {
  ContactError,
  ContactErrorStatus,
} from "modules/contact/shared/error/ContactError";

import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteContactService {
  constructor(
    @inject("ContactRepository")
    private repository: ContactRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const contactAlreadyExists = await this.repository.findById(id);

    if (contactAlreadyExists) {
      await this.repository.delete(id);
    } else {
      throw new ContactError(ContactErrorStatus.CONTACT_DONT_EXISTS);
    }

    return null;
  }
}

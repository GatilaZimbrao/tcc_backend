import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";

import {
  ContactError,
  ContactErrorStatus,
} from "modules/contact/shared/error/ContactError";
import { CreateContactService } from "../services/CreateContactService";
import { UpdateContactService } from "../services/UpdateContactService";
import { DeleteContactService } from "../services/DeleteContactService";
import { ListContactService } from "../services/ListContactService";
import { FindByIdContactService } from "../services/FindByIdContactService";

export class ContactController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email, tel } = req.body;

    if (!name || !email || !tel) {
      throw new ContactError(ContactErrorStatus.MISSING_PARAMS);
    }

    const createService = container.resolve(CreateContactService);

    const contact = await createService.execute({
      id: 0,
      name: name,
      email: email,
      tel: tel,
    });

    res.status(201).json(contact);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { name, email, tel } = req.body;

    if (!id || !name || !tel || !email) {
      throw new ContactError(ContactErrorStatus.MISSING_PARAMS);
    }

    const updateService = container.resolve(UpdateContactService);

    const contact = await updateService.execute({
      id: parseInt(id),
      name: name,
      email: email,
      tel: tel,
    });

    res.status(200).json(contact);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new ContactError(ContactErrorStatus.MISSING_PARAMS);
    }
    const deleteService = container.resolve(DeleteContactService);
    await deleteService.execute(Number(id));
    res.status(200).json({
      message: "Contato removido com sucesso",
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const listService = container.resolve(ListContactService);
    const contactList = await listService.execute();
    res.status(200).json(contactList);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new ContactError(ContactErrorStatus.MISSING_PARAMS);
    }
    const findByIdContactService = container.resolve(FindByIdContactService);
    const contact = await findByIdContactService.execute(Number(id));
    if (!contact) {
      throw new ContactError(ContactErrorStatus.CONTACT_DONT_EXISTS);
    }
    res.status(200).json(contact);
  }
}

import { Contact, PrismaClient } from "@prisma/client";
import { ContactRepository } from "modules/contact/domain/repositories/ContactRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaContactRepository implements ContactRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async list(): Promise<Contact[] | null> {
    const contacts = await this.prisma.contact.findMany({});

    return contacts;
  }

  async findById(id: number): Promise<Contact | null> {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id: id,
      },
    });

    return contact;
  }

  async findByName(name: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findFirst({
      where: {
        name: name,
      },
    });

    return contact;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.contact.delete({
      where: {
        id: id,
      },
    });

    return null;
  }

  async create(contact: Contact): Promise<Contact | null> {
    const newContact = await this.prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        tel: contact.tel,
      },
    });
    return newContact;
  }

  async update(contact: Contact): Promise<Contact | null> {
    const newContact = await this.prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: contact,
    });
    return newContact;
  }
}

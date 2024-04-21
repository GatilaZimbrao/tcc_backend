import { Contact } from "@prisma/client";

export interface ContactRepository {
  list(): Promise<Contact[] | null>;
  findById(id: number): Promise<Contact | null>;
  findByName(name: string): Promise<Contact | null>;
  delete(id: number): Promise<null>;
  create(contact: Contact): Promise<Contact | null>;
  update(contact: Contact): Promise<Contact | null>;
}

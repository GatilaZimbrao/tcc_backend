import { container } from "tsyringe";
import { ContactRepository } from "../domain/repositories/ContactRepository";
import { PrismaContactRepository } from "../implementations/prisma/repositories/PrismaContactRepository";

container.registerSingleton<ContactRepository>(
  "ContactRepository",
  PrismaContactRepository
);

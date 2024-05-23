import { Extension } from "@prisma/client";
import { ExtensionType } from "../models/ExtensionTypeModel";
import { ExtensionWithTeachers } from "../models/ExtensionWithTeachers";

export interface ExtensionRepository {
  list(extensionType: ExtensionType): Promise<Extension[] | null>;
  search(
    extensionType: ExtensionType,
    term: string
  ): Promise<Extension[] | null>;
  findById(id: number): Promise<Extension | null>;
  findByName(
    name: string,
    extensionType: ExtensionType
  ): Promise<Extension | null>;
  delete(id: number): Promise<null>;
  create(teacher: ExtensionWithTeachers): Promise<Extension | null>;
  update(teacher: ExtensionWithTeachers): Promise<Extension | null>;
}

import { Extension } from "@prisma/client";
import { ExtensionType } from "../models/ExtensionTypeModel";

export interface ExtensionRepository {
  list(extensionType: ExtensionType): Promise<Extension[] | null>;
  search(
    extensionType: ExtensionType,
    term: string
  ): Promise<Extension[] | null>;
  findById(id: number): Promise<Extension | null>;
  findByName(name: string): Promise<Extension | null>;
  delete(id: number): Promise<null>;
  create(teacher: Extension): Promise<Extension | null>;
  update(teacher: Extension): Promise<Extension | null>;
}

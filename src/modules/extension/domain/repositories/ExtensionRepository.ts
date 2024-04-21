import { Extension } from "@prisma/client";

export interface ExtensionRepository {
  list(): Promise<Extension[] | null>;
  search(term: string): Promise<Extension[] | null>;
  findById(id: number): Promise<Extension | null>;
  findByName(name: string): Promise<Extension | null>;
  delete(id: number): Promise<null>;
  create(teacher: Extension): Promise<Extension | null>;
  update(teacher: Extension): Promise<Extension | null>;
}

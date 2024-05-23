import { Page } from "@prisma/client";

export interface PageRepository {
  list(): Promise<Page[] | null>;
  findById(id: number): Promise<Page | null>;
  findByName(pathName: string): Promise<Page | null>;
  delete(id: number): Promise<null>;
  create(contact: Page): Promise<Page | null>;
  update(contact: Page): Promise<Page | null>;
}

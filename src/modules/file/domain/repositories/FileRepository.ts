import { File } from "@prisma/client";

export interface FileRepository {
  list(): Promise<File[] | null>;
  findById(id: number): Promise<File | null>;
  findByName(name: string): Promise<File | null>;
  delete(id: number): Promise<null>;
  create(file: File): Promise<File | null>;
}

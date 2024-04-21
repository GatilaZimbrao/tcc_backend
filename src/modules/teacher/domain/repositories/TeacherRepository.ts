import { Teacher } from "@prisma/client";

export interface TeacherRepository {
  list(): Promise<Teacher[] | null>;
  search(term: string): Promise<Teacher[] | null>;
  findById(id: number): Promise<Teacher | null>;
  findByName(name: string): Promise<Teacher | null>;
  delete(id: number): Promise<null>;
  create(teacher: Teacher): Promise<Teacher | null>;
  update(teacher: Teacher): Promise<Teacher | null>;
}

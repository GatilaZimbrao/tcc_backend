import { Teacher } from "@prisma/client";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class SearchTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(term: string): Promise<Teacher[] | null> {
    return await this.repository.search(term);
  }
}

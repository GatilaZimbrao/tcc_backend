import { Teacher } from "@prisma/client";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(id: number): Promise<Teacher | null> {
    return await this.repository.findById(id);
  }
}

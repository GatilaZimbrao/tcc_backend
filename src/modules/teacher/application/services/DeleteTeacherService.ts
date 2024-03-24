import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";

import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(id: number): Promise<null> {
    const teacherAlreadyExists = await this.repository.findById(id);

    if (teacherAlreadyExists) {
      await this.repository.delete(id);
    } else {
      throw new TeacherError(TeacherErrorStatus.TEACHER_DONT_EXISTS);
    }

    return null;
  }
}

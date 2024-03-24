import { Teacher } from "@prisma/client";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(teacher: Teacher): Promise<Teacher | null> {
    const teacherAlreadyExists = await this.repository.findByName(teacher.name);

    if (teacherAlreadyExists) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_ALREADY_EXISTS);
    }

    return await this.repository.create({
      id: teacher.id,
      name: teacher.name,
      education: teacher.education,
      image: teacher.image,
      linkLattes: teacher.linkLattes,
      type: teacher.type,
    });
  }
}

import { Teacher } from "@prisma/client";
import { TEACHER_TYPE } from "modules/teacher/domain/models/TeacherTypeModel";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(teacher: Teacher): Promise<Teacher | null> {
    const idIsValid = await this.repository.findById(teacher.id);

    if (!idIsValid) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_DONT_EXISTS);
    }

    if (!(typeof teacher.type == "string") || !(teacher.type in TEACHER_TYPE)) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_ALREADY_EXISTS);
    }

    const teacherByName = await this.repository.findByName(teacher.name);

    if (teacherByName && teacherByName.id != teacher.id) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_ALREADY_EXISTS);
    }

    return await this.repository.update({
      id: teacher.id,
      name: teacher.name,
      education: teacher.education,
      image: teacher.image,
      linkLattes: teacher.linkLattes,
      type: teacher.type,
    });
  }
}

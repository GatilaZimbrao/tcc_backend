import { Teacher } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import { existsSync, unlinkSync } from "fs";
import { TEACHER_TYPE } from "modules/teacher/domain/models/TeacherTypeModel";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";
import path from "path";

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(
    teacher: Teacher,
    uploadedFile: UploadedFile
  ): Promise<Teacher | null> {
    const idIsValid = await this.repository.findById(teacher.id);

    if (!idIsValid) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_DONT_EXISTS);
    }

    if (!(typeof teacher.type == "string") || !(teacher.type in TEACHER_TYPE)) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_TYPE_INVALID);
    }

    const teacherByName = await this.repository.findByName(teacher.name);

    if (teacherByName && teacherByName.id != teacher.id) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_ALREADY_EXISTS);
    }

    const filePath = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "../",
      "images",
      idIsValid.image
    );

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }

    const newFilePath = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "../",
      "images",
      teacher.image
    );

    uploadedFile.mv(newFilePath, (err: Error) => {
      if (err) {
        throw new TeacherError(TeacherErrorStatus.TEACHER_IMAGE_SAVE_ERROR);
      }
    });

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

import { Teacher } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import { TEACHER_TYPE } from "modules/teacher/domain/models/TeacherTypeModel";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";
import path from "path";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTeacherService {
  constructor(
    @inject("TeacherRepository")
    private repository: TeacherRepository
  ) {}

  public async execute(
    teacher: Teacher,
    uploadedFile: UploadedFile
  ): Promise<Teacher | null> {
    if (!(typeof teacher.type == "string") || !(teacher.type in TEACHER_TYPE)) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_TYPE_INVALID);
    }

    const teacherAlreadyExists = await this.repository.findByName(teacher.name);

    if (teacherAlreadyExists) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_ALREADY_EXISTS);
    }

    const uniqueSuffix = "cefet_" + Date.now() + "-";
    const filename = uniqueSuffix + teacher.image;

    const filePath = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "../",
      "images",
      filename
    );

    uploadedFile.mv(filePath, (err: Error) => {
      if (err) {
        throw new TeacherError(TeacherErrorStatus.TEACHER_IMAGE_SAVE_ERROR);
      }
    });

    return await this.repository.create({
      id: teacher.id,
      name: teacher.name,
      education: teacher.education,
      image: filename,
      linkLattes: teacher.linkLattes,
      type: teacher.type,
    });
  }
}

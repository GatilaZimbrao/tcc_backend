import { Extension } from "@prisma/client";
import {
  EXTENSION_TYPE,
  ExtensionType,
} from "modules/extension/domain/models/ExtensionTypeModel";
import { ExtensionWithTeachers } from "modules/extension/domain/models/ExtensionWithTeachers";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";
import {
  ExtensionError,
  ExtensionErrorStatus,
} from "modules/extension/shared/error/ExtensionError";
import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateExtensionService {
  constructor(
    @inject("ExtensionRepository")
    private repository: ExtensionRepository,
    @inject("TeacherRepository")
    private teacherRepository: TeacherRepository
  ) {}

  public async execute(
    extension: ExtensionWithTeachers
  ): Promise<Extension | null> {
    if (
      !(typeof extension.type == "string") ||
      !(extension.type in EXTENSION_TYPE)
    ) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_TYPE_INVALID);
    }

    const extensionAlreadyExists = await this.repository.findByName(
      extension.name,
      extension.type as ExtensionType
    );

    if (extensionAlreadyExists) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_ALREADY_EXISTS);
    }

    const teacherIds = extension.teachers.map((teacher) => teacher.teacherId);
    const uniqueTeacherIds = new Set(teacherIds);
    if (uniqueTeacherIds.size !== teacherIds.length) {
      throw new ExtensionError(
        ExtensionErrorStatus.EXTENSION_DUPLICATE_TEACHER
      );
    }

    for (const teacherId of teacherIds) {
      const teacherExist = await this.teacherRepository.findById(teacherId);
      if (!teacherExist) {
        throw new ExtensionError(
          ExtensionErrorStatus.EXTENSION_TEACHER_DONT_EXISTS
        );
      }
    }

    return await this.repository.create({
      id: extension.id,
      name: extension.name,
      abstract: extension.abstract,
      email: extension.email,
      isActive: extension.isActive,
      site: extension.site,
      type: extension.type,
      teachers: extension.teachers,
    });
  }
}

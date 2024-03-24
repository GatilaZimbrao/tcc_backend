import { container } from "tsyringe";
import { TeacherRepository } from "../domain/repositories/TeacherRepository";
import { PrismaTeacherRepository } from "../implementations/prisma/repositories/PrismaTeacherRepository";

container.registerSingleton<TeacherRepository>(
  "TeacherRepository",
  PrismaTeacherRepository
);

import { Teacher, PrismaClient } from "@prisma/client";

import { TeacherRepository } from "modules/teacher/domain/repositories/TeacherRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaTeacherRepository implements TeacherRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async list(): Promise<Teacher[] | null> {
    const teacher = await this.prisma.teacher.findMany({
      orderBy: {
        type: "desc",
      },
    });

    return teacher;
  }

  async search(term: string): Promise<Teacher[] | null> {
    const teachers = await this.prisma.teacher.findMany({
      where: {
        name: {
          contains: term,
        },
      },
      orderBy: {
        type: "desc",
      },
    });

    return teachers;
  }

  async findById(id: number): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findFirst({
      where: {
        id: id,
      },
    });

    return teacher;
  }

  async findByName(name: string): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findFirst({
      where: {
        name: name,
      },
    });

    return teacher;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    return null;
  }

  async create(teacher: Teacher): Promise<Teacher | null> {
    const newTeacher = await this.prisma.teacher.create({
      data: {
        name: teacher.name,
        image: teacher.image,
        education: teacher.education,
        linkLattes: teacher.linkLattes,
        type: teacher.type,
      },
    });
    return newTeacher;
  }

  async update(teacher: Teacher): Promise<Teacher | null> {
    const newTeacher = await this.prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: teacher,
    });
    return newTeacher;
  }
}

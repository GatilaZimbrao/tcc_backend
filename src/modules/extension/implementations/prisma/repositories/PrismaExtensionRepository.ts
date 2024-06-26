import { Extension, PrismaClient } from "@prisma/client";
import { ExtensionType } from "modules/extension/domain/models/ExtensionTypeModel";
import { ExtensionWithTeachers } from "modules/extension/domain/models/ExtensionWithTeachers";
import { ExtensionRepository } from "modules/extension/domain/repositories/ExtensionRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaExtensionRepository implements ExtensionRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async list(extensionType: ExtensionType): Promise<Extension[] | null> {
    const extensions = await this.prisma.extension.findMany({
      where: {
        type: {
          equals: extensionType,
        },
      },
      orderBy: {
        type: "desc",
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return extensions;
  }

  async search(
    extensionType: ExtensionType,
    term: string
  ): Promise<Extension[] | null> {
    const extensions = await this.prisma.extension.findMany({
      where: {
        name: {
          contains: term,
        },
        type: {
          equals: extensionType,
        },
      },
      orderBy: {
        type: "desc",
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return extensions;
  }

  async findById(id: number): Promise<Extension | null> {
    const extension = await this.prisma.extension.findFirst({
      where: {
        id: id,
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return extension;
  }

  async findByName(
    name: string,
    extensionType: ExtensionType
  ): Promise<Extension | null> {
    const extension = await this.prisma.extension.findFirst({
      where: {
        name: name,
        type: {
          equals: extensionType,
        },
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return extension;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.extension.delete({
      where: {
        id: id,
      },
    });

    return null;
  }

  async create(extension: ExtensionWithTeachers): Promise<Extension | null> {
    const newExtension = await this.prisma.extension.create({
      data: {
        name: extension.name,
        abstract: extension.abstract,
        email: extension.email,
        site: extension.site,
        type: extension.type,
        isActive: extension.isActive,
        teachers: {
          create: extension.teachers.map((teacher) => ({
            teacher: {
              connect: {
                id: teacher.teacherId,
              },
            },
          })),
        },
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return newExtension;
  }

  async update(extension: ExtensionWithTeachers): Promise<Extension | null> {
    const updatedExtension = await this.prisma.extension.update({
      where: {
        id: extension.id,
      },
      data: {
        name: extension.name,
        abstract: extension.abstract,
        email: extension.email,
        site: extension.site,
        type: extension.type,
        isActive: extension.isActive,
        teachers: {
          deleteMany: {},
          create: extension.teachers.map((teacher) => ({
            teacher: {
              connect: {
                id: teacher.teacherId,
              },
            },
          })),
        },
      },
      include: {
        teachers: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return updatedExtension;
  }
}

import { File, PrismaClient } from "@prisma/client";
import { FileRepository } from "modules/file/domain/repositories/FileRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaFileRepository implements FileRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async list(): Promise<File[] | null> {
    const file = await this.prisma.file.findMany({});

    return file;
  }

  async findById(id: number): Promise<File | null> {
    const file = await this.prisma.file.findFirst({
      where: {
        id: id,
      },
    });

    return file;
  }

  async findByName(name: string): Promise<File | null> {
    const file = await this.prisma.file.findFirst({
      where: {
        name: name,
      },
    });

    return file;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.file.delete({
      where: {
        id: id,
      },
    });

    return null;
  }

  async create(file: File): Promise<File | null> {
    const newFile = await this.prisma.file.create({
      data: {
        name: file.name,
        type: file.type,
        file_name: file.file_name,
      },
    });
    return newFile;
  }
}

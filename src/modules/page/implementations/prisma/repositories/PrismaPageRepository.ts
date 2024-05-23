import { Page, PrismaClient } from "@prisma/client";
import { PageRepository } from "modules/page/domain/repositories/PageRepository";

import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaPageRepository implements PageRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async list(): Promise<Page[] | null> {
    const pages = await this.prisma.page.findMany({});

    return pages;
  }

  async findById(id: number): Promise<Page | null> {
    const page = await this.prisma.page.findFirst({
      where: {
        id: id,
      },
    });

    return page;
  }

  async findByName(pathName: string): Promise<Page | null> {
    const page = await this.prisma.page.findFirst({
      where: {
        pathName: pathName,
      },
    });

    return page;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.page.delete({
      where: {
        id: id,
      },
    });

    return null;
  }

  async create(page: Page): Promise<Page | null> {
    const newPage = await this.prisma.page.create({
      data: {
        pathName: page.pathName,
        title: page.title,
        description: page.description,
      },
    });
    return newPage;
  }

  async update(page: Page): Promise<Page | null> {
    const newPage = await this.prisma.page.update({
      where: {
        id: page.id,
      },
      data: page,
    });
    return newPage;
  }
}

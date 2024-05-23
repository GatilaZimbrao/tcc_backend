import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";

import {
  PageError,
  PageErrorStatus,
} from "modules/page/shared/error/PageError";
import { CreatePageService } from "../services/CreatePageService";
import { UpdatePageService } from "../services/UpdatePageService";
import { DeletePageService } from "../services/DeletePageService";
import { ListPageService } from "../services/ListPageService";
import { FindByIdPageService } from "../services/FindByIdPageService";
import { FindByNamePageService } from "../services/FindByNamePageService";

export class PageController {
  async create(req: Request, res: Response): Promise<void> {
    const { pathName, title, description } = req.body;

    if (!pathName || !title) {
      throw new PageError(PageErrorStatus.MISSING_PARAMS);
    }

    const createService = container.resolve(CreatePageService);

    const page = await createService.execute({
      id: 0,
      pathName: pathName,
      title: title,
      description: description !== undefined ? description : null,
    });

    res.status(201).json(page);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { pathName, title, description } = req.body;

    if (!id || !pathName || !title) {
      throw new PageError(PageErrorStatus.MISSING_PARAMS);
    }

    const updateService = container.resolve(UpdatePageService);

    const page = await updateService.execute({
      id: parseInt(id),
      pathName: pathName,
      title: title,
      description: description !== undefined ? description : null,
    });

    res.status(200).json(page);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new PageError(PageErrorStatus.MISSING_PARAMS);
    }
    const deleteService = container.resolve(DeletePageService);
    await deleteService.execute(Number(id));
    res.status(200).json({
      message: "Pagina removido com sucesso",
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const listService = container.resolve(ListPageService);
    const pageList = await listService.execute();
    res.status(200).json(pageList);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new PageError(PageErrorStatus.MISSING_PARAMS);
    }
    const findByIdPageService = container.resolve(FindByIdPageService);
    const page = await findByIdPageService.execute(Number(id));
    if (!page) {
      throw new PageError(PageErrorStatus.PAGE_DONT_EXISTS);
    }
    res.status(200).json(page);
  }

  async findByName(req: Request, res: Response): Promise<void> {
    const { pathName } = req.params;
    if (!pathName) {
      throw new PageError(PageErrorStatus.MISSING_PARAMS);
    }
    const findByNamePageService = container.resolve(FindByNamePageService);
    const page = await findByNamePageService.execute(pathName);
    if (!page) {
      throw new PageError(PageErrorStatus.PAGE_DONT_EXISTS);
    }
    res.status(200).json(page);
  }
}

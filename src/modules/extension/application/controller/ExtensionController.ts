import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";

import {
  ExtensionError,
  ExtensionErrorStatus,
} from "modules/extension/shared/error/ExtensionError";
import { CreateExtensionService } from "../services/CreateExtensionService";
import { DeleteExtensionService } from "../services/DeleteExtensionService";
import { ListExtensionService } from "../services/ListExtensionService";
import { FindByIdExtensionService } from "../services/FindByIdExtensionService";
import { UpdateExtensionService } from "../services/UpdateExtensionService";
import { SearchExtensionService } from "../services/SearchExtensionService";
import { EXTENSION_TYPE } from "modules/extension/domain/models/ExtensionTypeModel";

export class ExtensionController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, abstract, email, site, type, teacherId } = req.body;

    if (!name || !abstract || !email || !site || !type || !teacherId) {
      throw new ExtensionError(ExtensionErrorStatus.MISSING_PARAMS);
    }

    if (!(type in EXTENSION_TYPE)) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_TYPE_INVALID);
    }

    const createService = container.resolve(CreateExtensionService);

    const extension = await createService.execute({
      id: 0,
      name: name,
      abstract: abstract,
      email: email,
      site: site,
      type: type,
      teacherId: teacherId,
    });

    res.status(201).json(extension);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { name, abstract, email, site, type, teacherId } = req.body;

    if (!id || !name || !abstract || !email || !site || !type || !teacherId) {
      throw new ExtensionError(ExtensionErrorStatus.MISSING_PARAMS);
    }

    const updateService = container.resolve(UpdateExtensionService);

    const extension = await updateService.execute({
      id: parseInt(id),
      name: name,
      abstract: abstract,
      email: email,
      site: site,
      type: type,
      teacherId: teacherId,
    });

    res.status(200).json(extension);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new ExtensionError(ExtensionErrorStatus.MISSING_PARAMS);
    }
    const deleteService = container.resolve(DeleteExtensionService);
    await deleteService.execute(Number(id));
    res.status(200).json({
      message: "Atividade de extensão removida com sucesso",
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const { term } = req.query;
    if (term && typeof term == "string") {
      const searchService = container.resolve(SearchExtensionService);
      const extensionList = await searchService.execute(term);
      res.status(200).json(extensionList);
    } else {
      const listService = container.resolve(ListExtensionService);
      const extensionList = await listService.execute();
      res.status(200).json(extensionList);
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new ExtensionError(ExtensionErrorStatus.MISSING_PARAMS);
    }
    const findByIdExtensionService = container.resolve(
      FindByIdExtensionService
    );
    const extension = await findByIdExtensionService.execute(Number(id));
    if (!extension) {
      throw new ExtensionError(ExtensionErrorStatus.EXTENSION_DONT_EXISTS);
    }
    res.status(200).json(extension);
  }
}

import "reflect-metadata";

import { Request, Response } from "express";

import { container } from "tsyringe";

import {
  TeacherError,
  TeacherErrorStatus,
} from "modules/teacher/shared/error/TeacherError";
import { CreateTeacherService } from "../services/CreateTeacherService";
import { DeleteTeacherService } from "../services/DeleteTeacherService";
import { ListTeacherService } from "../services/ListTeacherService";
import { FindByIdTeacherService } from "../services/FindByIdTeacherService";
import { UpdateTeacherService } from "../services/UpdateTeacherService";
import { SearchTeacherService } from "../services/SearchTeacherService";

export class TeacherController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, image, education, linkLattes, type } = req.body;

    if (!name || !education || !image || !linkLattes || !type) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }

    const createService = container.resolve(CreateTeacherService);

    const teacher = await createService.execute({
      id: 0,
      name: name,
      image: image,
      education: education,
      linkLattes: linkLattes,
      type: type,
    });

    res.status(201).json(teacher);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { name, image, education, linkLattes, type } = req.body;

    if (!id || !name || !education || !image || !linkLattes || !type) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }

    const updateService = container.resolve(UpdateTeacherService);

    const teacher = await updateService.execute({
      id: parseInt(id),
      name: name,
      image: image,
      education: education,
      linkLattes: linkLattes,
      type: type,
    });

    res.status(200).json(teacher);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }
    const deleteService = container.resolve(DeleteTeacherService);
    await deleteService.execute(Number(id));
    res.status(200).json({
      message: "Docente removido com sucesso",
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const { term } = req.query;
    if (term && typeof term == "string") {
      const searchService = container.resolve(SearchTeacherService);
      const teacherList = await searchService.execute(term);
      res.status(200).json(teacherList);
    } else {
      const listService = container.resolve(ListTeacherService);
      const teacherList = await listService.execute();
      res.status(200).json(teacherList);
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }
    const findByIdTeacherService = container.resolve(FindByIdTeacherService);
    const teacher = await findByIdTeacherService.execute(Number(id));
    if (!teacher) {
      throw new TeacherError(TeacherErrorStatus.TEACHER_DONT_EXISTS);
    }
    res.status(200).json(teacher);
  }
}

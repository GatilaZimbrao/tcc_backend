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
import { FileArray, UploadedFile } from "express-fileupload";

export class TeacherController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, education, linkLattes, type } = req.body;

    if (!name || !education || !linkLattes || !type) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }

    let file_name = "";
    let uploadedFile: UploadedFile | undefined;

    const files = req.files as FileArray;

    Object.keys(files).forEach((key) => {
      if (!Array.isArray(files[key])) {
        uploadedFile = files[key] as UploadedFile;

        file_name = uploadedFile.name;
      }
    });

    if (!file_name || !uploadedFile) {
      throw new TeacherError(TeacherErrorStatus.MISSING_PARAMS);
    }

    const uniqueSuffix =
      "cefet_" + Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + file_name;

    const createService = container.resolve(CreateTeacherService);

    const teacher = await createService.execute(
      {
        id: 0,
        name: name,
        image: filename,
        education: education,
        linkLattes: linkLattes,
        type: type,
      },
      uploadedFile
    );

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

      const newTeacherList = teacherList?.map((teacher) => {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
          teacher.image
        }`;

        return {
          ...teacher,
          image: imageUrl,
        };
      });
      res.status(200).json(newTeacherList);
    } else {
      const listService = container.resolve(ListTeacherService);
      const teacherList = await listService.execute();

      const newTeacherList = teacherList?.map((teacher) => {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
          teacher.image
        }`;

        return {
          ...teacher,
          image: imageUrl,
        };
      });
      res.status(200).json(newTeacherList);
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

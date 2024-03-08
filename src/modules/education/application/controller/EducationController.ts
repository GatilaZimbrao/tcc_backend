// import { container } from "tsyringe";

import { Request, Response } from "express";
import { prismaClient } from "infra/prisma";

export class EducationController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        message: "Parâmetros inválidos",
      });
      return;
    }
    try {
      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
        },
      });
      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(400).json();
      return;
    }
  }

  //   async create(req: Request, res: Response): Promise<void> {
  //     const { name, props, tag, status, visibility, expireDate } = req.body;

  //     if (!req.context.segment || !req.context.segment.workspace)
  //       throw new WorkspaceError(WorkspaceErrorStatus.INVALID_WORKSPACE_ID);

  //     const { id: workspaceId } = req.context.segment?.workspace;
  //     const { locale } = req.context.segment;

  //     const readSchemaService = container.resolve(ReadSchemaService);
  //     const createSchemaService = container.resolve(CreateSchemaService);

  //     let schemaId;

  //     try {
  //       schemaId = (
  //         await readSchemaService.execute({
  //           tag,
  //           workspaceId,
  //           locale,
  //         })
  //       ).id;
  //     } catch (_) {
  //       schemaId = (
  //         await createSchemaService.execute({
  //           tag,
  //           workspaceId,
  //           version: SCHEMA_CURRENT_VERSION,
  //           locale,
  //         })
  //       ).id;
  //     }

  //     if (!schemaId) throw new CmsError(CmsErrorStatus.SCHEMA_NOT_FOUND);

  //     const createContentService = container.resolve(CreateContentService);

  //     const content = await createContentService.execute({
  //       name,
  //       props,
  //       schemaId,
  //       status,
  //       visibility,
  //       expireDate,
  //       locale,
  //     });

  //     res.status(201).json(content);
  //   }

  //   async read(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     const readContentService = container.resolve(ReadContentService);

  //     const content = await readContentService.execute({
  //       id,
  //     });

  //     res.status(200).json(content);
  //   }

  //   async update(req: Request, res: Response): Promise<void> {
  //     const { id, expireDate, startDate, name, props, status, visibility } =
  //       req.body as UpdateContentDTO;

  //     const updateContentService = container.resolve(UpdateContentService);

  //     const content = await updateContentService.execute({
  //       id,
  //       expireDate,
  //       startDate,
  //       name,
  //       props,
  //       status,
  //       visibility,
  //     });

  //     res.status(200).json(content);
  //   }

  //   async delete(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     const deleteContentService = container.resolve(DeleteContentService);

  //     await deleteContentService.execute({
  //       id,
  //     });

  //     res.status(204).send();
  //   }
}

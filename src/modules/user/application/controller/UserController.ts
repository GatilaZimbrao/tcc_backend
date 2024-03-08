import "reflect-metadata";

import { Request, Response } from "express";
// import { prismaClient } from "infra/prisma";

export class UserController {
  // async list(req: Request, res: Response): Promise<void> {
  //   try {
  //     const users = await prismaClient.user.findMany({});
  //     res.status(200).json(users);
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }
  // async findById(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;
  //   if (!id || Number.isNaN(Number(id))) {
  //     res.status(400).json({
  //       message: "Parâmetros inválidos",
  //     });
  //     return;
  //   }
  //   try {
  //     const user = await prismaClient.user.findUnique({
  //       where: {
  //         id: Number(id),
  //       },
  //     });
  //     res.status(200).json(user);
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }
  // async delete(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;
  //   if (!id || Number.isNaN(Number(id))) {
  //     res.status(400).json({
  //       message: "Parâmetros inválidos",
  //     });
  //     return;
  //   }
  //   try {
  //     const user = await prismaClient.user.delete({
  //       where: {
  //         id: Number(id),
  //       },
  //     });
  //     res.status(200).json({
  //       message: `Usuario ${user.name} deletado com sucesso`,
  //     });
  //     return;
  //   } catch (error) {
  //     res.status(400).json();
  //     return;
  //   }
  // }
}

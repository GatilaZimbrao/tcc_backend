import { Router } from "express";
import { TeacherController } from "../application/controller/TeacherController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const teacherRouter = Router();
const controller = new TeacherController();

teacherRouter.post(
  "/",
  VerifySession,
  PermitRole(["admin"]),
  controller.create
);
teacherRouter.put(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.update
);
teacherRouter.delete(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.delete
);
teacherRouter.get("/:id", controller.findById);
teacherRouter.get("/", controller.list);

export { teacherRouter };

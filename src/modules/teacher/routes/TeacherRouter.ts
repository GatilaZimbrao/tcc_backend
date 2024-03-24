import { Router } from "express";
import { TeacherController } from "../application/controller/TeacherController";

const teacherRouter = Router();
const controller = new TeacherController();

teacherRouter.post("/", controller.create);
teacherRouter.delete("/:id", controller.delete);
teacherRouter.get("/:id", controller.findById);
teacherRouter.get("/", controller.list);

export { teacherRouter };

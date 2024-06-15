import { Router } from "express";
import { TeacherController } from "../application/controller/TeacherController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";
import fileUpload from "express-fileupload";
import { filesPayloadExists } from "modules/file/middlewares/filesPayloadExists";
import { filesExtLimiter } from "modules/file/middlewares/filesExtLimiter";
import { filesSizeLimiter } from "modules/file/middlewares/filesSizeLimiter";
import { IMAGE_ALLOWED_EXT } from "modules/file/config/config";

const teacherRouter = Router();
const controller = new TeacherController();

teacherRouter.post(
  "/",

  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  filesExtLimiter(IMAGE_ALLOWED_EXT),
  filesSizeLimiter,

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

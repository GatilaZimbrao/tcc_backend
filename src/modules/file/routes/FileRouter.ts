import { Router } from "express";
import { FileController } from "../application/controller/FileController";
import fileUpload from "express-fileupload";
import { filesExtLimiter } from "../middlewares/filesExtLimiter";
import { filesSizeLimiter } from "../middlewares/filesSizeLimiter";
import { filesPayloadExists } from "../middlewares/filesPayloadExists";
import { FILE_ALLOWED_EXT } from "../config/config";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const fileRouter = Router();
const controller = new FileController();

fileRouter.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  filesExtLimiter(FILE_ALLOWED_EXT),
  filesSizeLimiter,

  VerifySession,
  PermitRole(["admin"]),
  controller.create
);

fileRouter.put(
  "/:id",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  filesExtLimiter(FILE_ALLOWED_EXT),
  filesSizeLimiter,

  VerifySession,
  PermitRole(["admin"]),
  controller.update
);

fileRouter.delete(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.delete
);
fileRouter.get("/:id", controller.findById);
fileRouter.get("/", controller.list);

export { fileRouter };

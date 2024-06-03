import { Router } from "express";
import { ExtensionController } from "../application/controller/ExtensionController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const extensionRouter = Router();
const controller = new ExtensionController();

extensionRouter.use(VerifySession);

extensionRouter.post("/", PermitRole(["admin"]), controller.create);
extensionRouter.put("/:id", PermitRole(["admin"]), controller.update);
extensionRouter.delete("/:id", PermitRole(["admin"]), controller.delete);
extensionRouter.get("/:id", controller.findById);
extensionRouter.get("/", controller.list);

export { extensionRouter };

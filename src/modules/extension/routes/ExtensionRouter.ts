import { Router } from "express";
import { ExtensionController } from "../application/controller/ExtensionController";
import { VerifySession } from "@shared/middlewares/VerifySession";

const extensionRouter = Router();
const controller = new ExtensionController();

extensionRouter.use(VerifySession);

extensionRouter.post("/", controller.create);
extensionRouter.put("/:id", controller.update);
extensionRouter.delete("/:id", controller.delete);
extensionRouter.get("/:id", controller.findById);
extensionRouter.get("/", controller.list);

export { extensionRouter };

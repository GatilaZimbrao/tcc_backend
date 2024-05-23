import { Router } from "express";
import { PageController } from "../application/controller/PageController";
import { VerifySession } from "@shared/middlewares/VerifySession";

const pageRouter = Router();
const controller = new PageController();

pageRouter.use(VerifySession);

pageRouter.post("/", controller.create);
pageRouter.put("/:id", controller.update);
pageRouter.delete("/:id", controller.delete);
pageRouter.get("/:id", controller.findById);
pageRouter.get("/find/:name", controller.findByName);
pageRouter.get("/", controller.list);

export { pageRouter };

import { Router } from "express";
import { PageController } from "../application/controller/PageController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const pageRouter = Router();
const controller = new PageController();

pageRouter.post("/", VerifySession, PermitRole(["admin"]), controller.create);
pageRouter.put("/:id", VerifySession, PermitRole(["admin"]), controller.update);
pageRouter.delete(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.delete
);
pageRouter.get("/:id", controller.findById);
pageRouter.get("/find/:name", controller.findByName);
pageRouter.get("/", controller.list);

export { pageRouter };

import { Router } from "express";
import { ContactController } from "../application/controller/ContactController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const contactRouter = Router();
const controller = new ContactController();

contactRouter.post(
  "/",
  VerifySession,
  PermitRole(["admin"]),
  controller.create
);
contactRouter.put(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.update
);
contactRouter.delete(
  "/:id",
  VerifySession,
  PermitRole(["admin"]),
  controller.delete
);
contactRouter.get("/:id", controller.findById);
contactRouter.get("/", controller.list);

export { contactRouter };

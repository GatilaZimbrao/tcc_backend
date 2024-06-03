import { Router } from "express";
import { ContactController } from "../application/controller/ContactController";
import { VerifySession } from "@shared/middlewares/VerifySession";
import { PermitRole } from "@shared/middlewares/PermitRole";

const contactRouter = Router();
const controller = new ContactController();

contactRouter.use(VerifySession);

contactRouter.post("/", PermitRole(["admin"]), controller.create);
contactRouter.put("/:id", PermitRole(["admin"]), controller.update);
contactRouter.delete("/:id", PermitRole(["admin"]), controller.delete);
contactRouter.get("/:id", controller.findById);
contactRouter.get("/", controller.list);

export { contactRouter };

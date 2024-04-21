import { Router } from "express";
import { ContactController } from "../application/controller/ContactController";
import { VerifySession } from "@shared/middlewares/VerifySession";

const contactRouter = Router();
const controller = new ContactController();

contactRouter.use(VerifySession);

contactRouter.post("/", controller.create);
contactRouter.put("/:id", controller.update);
contactRouter.delete("/:id", controller.delete);
contactRouter.get("/:id", controller.findById);
contactRouter.get("/", controller.list);

export { contactRouter };
